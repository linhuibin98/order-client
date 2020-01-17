import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getStorage, setStorage } from "../util/storage";
import Toast from '../components/toast';
import Modal from '../components/modal';
import { generateOrder } from '../api';
import { Link } from 'react-router-dom';
import formatSearch from '../util/formatSearch';

function OrderConfirmation(props) {
  let [order, setOrder] = useState({});
  let [address, setAddress] = useState({});

  let { userInfo, location, history, cartList } = props;
  let shopData = (location.state && location.state.shopData) || getStorage('shopData');

  let cart = getStorage('cartList');
  cartList = cartList.length ? cartList : (cart[shopData._id] || []);


  useEffect(() => {
    // 本地保存数据
    setStorage('shopData', shopData);
    let addressLocal = getStorage('address') || {};
    if (addressLocal[userInfo.id] && addressLocal[userInfo.id].name) {
      setAddress(addressLocal[userInfo.id]);
    }

    if (cartList.length !== 0) {
      let allPrice = 0;
      cartList.forEach(food => {
        allPrice += parseFloat(food.price) * food.num;
      });
      allPrice += shopData.distribution_cost;

      allPrice = allPrice.toFixed(2);

      let o = {
        storeName: shopData.store_name,
        dispatchCost: shopData.distribution_cost,
        cartList,
        allPrice
      }

      setOrder(o);
      setStorage('order', o);
    } else {
      let orderLocal = getStorage('order');
      setOrder({
        ...orderLocal
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleGoBack() {
    //退出订单页面, 清楚本地存储
    setStorage('order', {});
    let redirect = formatSearch(location.search);

    redirect ? history.replace(redirect) : history.goBack();
  }

  function handleClickPay() {
    if (!address.name) {
      return Toast.info('请添加地址...');
    }
    Modal.confirm({
      title: '支付宝支付测试接口',
      contentText: `
      请选择：继续浏览器付款
      登录以下账号
      账号: pvnseu0360@sandbox.com
      登录密码: 111111
      支付密码: 111111
      `,
      async onOk() {
        let sendData = {
          userId: userInfo.id,
          storeId: shopData._id,
          storeName: shopData.store_name,
          storeLogoUrl: shopData.store_logo_url,
          foods: cartList,
          price: order.allPrice,
          address
        }
        // 生成新的订单
        let res = await generateOrder(sendData);

        if (res.status === 200 && res.data.errorCode === 0) {
          //退出订单页面, 清楚本地存储
          const cart = getStorage('cartList') || {};
          cart[shopData._id] = [];
          setStorage('cartList', cart);
          window.location.href = res.data.result;
        } else {
          Toast.error('服务器正忙...');
        }
      }
    })
  }

  return (
    <div className="order_confim_container">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>确认订单</h1>
      </header>
      <section className="address">
        {
          address.name ? (
            <>
              <p>订单配送至</p>
              <Link to={{ pathname: '/user/address/select', search: `?redirect=${location.pathname + location.search}` }}>
                <p>
                  <span>{address.address + address.detail}</span>
                  <span>></span>
                </p>
                <div className="user_detail">
                  <span>{address.name}</span>
                  <span>{address.phone}</span>
                </div>
              </Link>
            </>
          ) : (
              <Link to='/user/address/select' className='address_select'>选择地址</Link>
            )
        }
      </section>
      <section className="cart_group">
        <h3 className="cart_storename">{order.storeName}</h3>
        <ul className="foods">
          {order.cartList && order.cartList.map((food, i) => {
            return (
              <li className="cart_item" key={i}>
                <div className="logo">
                  <img src={food.pic} alt="logo" />
                </div>
                <span className="name">{food.name}</span>
                <span className="num">x {food.num}</span>
                <span className="price">￥{food.price}</span>
              </li>
            );
          })}
        </ul>
        <div className="dispatch_cost other">
          <span>配送费</span>
          <span>￥{order.dispatchCost}</span>
        </div>
        {/** 
           * 
           * <div className='other'>
              <span>红包</span>
              <span>-4</span>
              </div>
          */}
        <div className="price other">
          <span>优惠说明</span>
          <span>
            小计 ￥<span className="all_price">{order.allPrice}</span>
          </span>
        </div>
        <footer className="pay_bar">
          <span>￥{order.allPrice}</span>
          <div className="pay" onClick={handleClickPay}>去支付</div>
        </footer>
      </section>
    </div>
  );
}

export default connect(store => ({ userInfo: store.user.userInfo, cartList: store.shop.cartList }))(OrderConfirmation);
