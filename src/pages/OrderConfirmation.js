import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getStorage, setStorage } from "../util/storage";
import Toast from '../components/toast';
import Modal from '../components/modal';
import { generateOrder } from '../api';
import actions from '../store/actions';
import { Link } from 'react-router-dom';

function OrderConfirmation(props) {
  let { shopData, cartList, userInfo, updateCart, getAddress } = props;

  let [order, setOrder] = useState({});
  let [address, setAddress] = useState({});

  useEffect(() => {
    let orderLocal = getStorage('order');
    let addressLocal = getStorage('address') || {};

    if (addressLocal[userInfo.id] && addressLocal[userInfo.id].name) {
      setAddress(addressLocal[userInfo.id]);
      getAddress(addressLocal[userInfo.id]);
    }

    if (orderLocal && orderLocal.storeName) {
      setOrder({
        ...orderLocal
      });
    } else {
      let allPrice = 0;
      cartList.forEach(food => {
        allPrice += parseFloat(food.price) * food.num;
      });
      allPrice += shopData.distribution_cost;

      let o = {
        storeName: shopData.store_name,
        dispatchCost: shopData.distribution_cost,
        cartList,
        allPrice
      }

      setOrder(o);
      setStorage('order', o);
    }
  }, [cartList, getAddress, setOrder, shopData.distribution_cost, shopData.store_name, userInfo.id]);

  function handleGoBack() {
    props.history.go(-1);

    //退出订单页面, 清楚本地存储
    setStorage('order', {});
  }

  function handleClickPay() {
    Modal.confirm({
      contentText: '确认支付',
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
          Toast.success('支付成功');
          //清空购物车
          updateCart({ id: shopData._id, cartList: [] });
          //退出订单页面, 清楚本地存储
          setStorage('order', {});

          props.history.push('/order');
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
              <Link to='/user/address/select'>
                <p>
                  <span>{address.address}</span>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCart: (opts) => {
      dispatch(actions.shop.setCartList({
        ...opts
      }))
    },
    getAddress: val => {
      dispatch(actions.user.userSelectAddress(val))
    }
  }
}

export default connect(store => ({ ...store.shop, userInfo: store.user.userInfo }), mapDispatchToProps)(OrderConfirmation);
