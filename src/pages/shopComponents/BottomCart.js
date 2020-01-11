import React from 'react';
import { connect } from 'react-redux';
import Toast from '../../components/toast';
import actions from '../../store/actions';
import PropTypes  from 'prop-types';

BottomCart.propTypes = {
  cartList: PropTypes.array,
  shopData: PropTypes.object
}

function BottomCart(props) {

  const { cartList, isLogin, history, location, shopData, updateCartList } = props;

  let isEmpty = !cartList.length;
  let allPrice = 0;
  
  cartList.forEach(item => {
    allPrice += parseFloat(item.price) * item.num;
  })
  // 总金额保留两位小数
  allPrice = allPrice.toFixed(2);

  function handleClickPay() {
    console.log(updateCartList)
    if (isLogin) {//已经登陆，跳转到订单页
      updateCartList(cartList);
      history.push({
        pathname: '/order_confim',
        state: { shopData },
        search: `?redirect=${location.pathname}`
      });
    } else {// 未登陆，跳转到登录页
      Toast.warning('请登录...');
      history.push({
        pathname: '/user/login',
        search: `?redirect=${location.pathname}`
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

const mapDispatchToProps = dispatch => {
  return {
    updateCartList: (data) => {
      dispatch(actions.shop.shopCartlist(data))
    }
  }
}

export default connect(store => ({ isLogin: store.user.isLogin }), mapDispatchToProps)(BottomCart);