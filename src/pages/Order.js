import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import BottomTabBar from '../components/BottomTabBar';
import { connect } from 'react-redux';
import formateDate from '../util/formatDate';
import actions from '../store/actions';
import { requestGetOrders } from '../api';
import Toast from '../components/toast';

class Order extends Component {

  handleClickReOrder(id) {
    this.props.history.push(`/shop/${id}`);
  }

  async componentDidMount() {
    let { userInfo: { id }, getOrders} = this.props;
    // 获取列表
    let result = await requestGetOrders(id);
    if (result.status === 200 && result.data.errorCode === 0) {
      getOrders(result.data.orders);
    } else {
      Toast.error(result.data.message);
    }
  }

  render() {
    let { orderList } = this.props;

    return (
      <div className='order_container'>
        <div className='title'>订单</div>
        <div className='order_list'>
          {
            orderList.map((order, index) => {
              return (
                <div className='order_item' key={index}>
                  <Link className='order_avatar' to={`/shop/${order.storeId}`}><img src={order.storeLogoUrl}  alt='logo'/></Link>
                  <div className="order_detail">
                    <div className="trade_name">
                      <div className='trade'>
                        <Link className='name' to={`/shop/${order.storeId}`}>{order.storeName}</Link>
                        <div className="spilt">></div>
                        <div className='arrive'>已送达</div>
                      </div>
                      <div className="order_time">{formateDate(order.time)}</div>
                    </div>
                    <Link className="foods_detail" to={`/order_detail/${index}`}>
                      <div className='name'><div className='n'>{order.foods[0].name}</div><div className='num'>等{ order.foods.length }件商品</div></div>
                      <div className='price'>￥{order.price}</div>
                    </Link>
                    <div className="order_operate">
                      <button onClick={this.handleClickReOrder.bind(this, order.storeId)}>再来一单</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <BottomTabBar />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getOrders: id => {
      dispatch(actions.user.userGetOrders(id))
    }
  }
}

export default withRouter(connect( state => ({ orderList: state.user.orders, userInfo: state.user.userInfo }), mapDispatchToProps)(Order));