import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Toast  from '../../components/toast';

function BottomCart(props) {

  const { cartList, isLogin, history, location } = props;

  let isEmpty = !cartList.length;
  let allPrice = 0;
  
  cartList.forEach(item => {
    allPrice += parseFloat(item.price) * item.num;
  })

  function handleClickPay() {
    if (isLogin) {//已经登陆，跳转到订单页
      history.push('/order_confim');
    } else {// 未登陆，跳转到登录页
      history.push({
        pathname: '/user/login',
        state: { from: location.pathname }
      });
    }
  }

  return (
    <div className='bottom_cart_container'>
      {
        isEmpty ? (<>
          <span className='cart_icon'><i className='iconfont icon-icon_cart'></i></span>
          <div className='cart_setail'>未选购商品</div>
          <div className='pay'>￥0起送</div>
        </>) : (<>
            <span className='cart_icon active'><i className='iconfont icon-icon_cart active'></i></span>
            <div className='cart_setail'>
              <p className='all_price'>￥{allPrice}</p>
            </div>
            <div className='pay active' onClick={handleClickPay}>去结算</div>
        </>)
      }
    </div>
  )
}

export default connect(store => ({ cartList: store.shop.cartList, isLogin: store.user.isLogin }))(BottomCart);