import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BottomTabBar from '../components/BottomTabBar'
import { connect } from 'react-redux'
import formateDate from '../util/formatDate'
import { requestGetOrders } from '../api'
import Toast from '../components/toast'
import EmptyTip from '../components/empty-tip'

@connect(state => ({ userInfo: state.user.userInfo }))
class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderList: []
    }
  }

  handleClickReOrder(id) {
    this.props.history.push(`/shop/${id}`)
  }

  handleClickAssess(id) {
    this.props.history.push(`/order/assess/${id}`)
  }

  async componentDidMount() {
    let {
      userInfo: { id }
    } = this.props
    // 获取列表
    let result = await requestGetOrders(id)
    if (result.status === 200 && result.data.errorCode === 0) {
      this.setState({
        orderList: result.data.orders
      })
    } else {
      Toast.error(result.data.message)
    }
  }

  render() {
    let { orderList } = this.state

    return (
      <div className="order_container">
        <div className="title">订单</div>
        {!orderList.length ? (
          <EmptyTip />
        ) : (
          <div className="order_list">
            {orderList.map((order, index) => {
              return (
                <div className="order_item" key={index}>
                  <Link className="order_avatar" to={`/shop/${order.storeId}`}>
                    <img src={order.storeLogoUrl} alt="logo" />
                  </Link>
                  <div className="order_detail">
                    <div className="trade_name">
                      <div className="trade">
                        <Link className="name" to={`/shop/${order.storeId}`}>
                          {order.storeName}
                        </Link>
                        <div className="spilt">></div>
                        <div className="arrive">已支付</div>
                      </div>
                      <div className="order_time">
                        {formateDate(order.time)}
                      </div>
                    </div>
                    <Link
                      className="foods_detail"
                      to={`/order_detail/${order.storeId}/${order.num}`}
                    >
                      <div className="name">
                        <div className="n">{order.foods[0].name}</div>
                        <div className="num">等{order.foods.length}件商品</div>
                      </div>
                      <div className="price">￥{order.price}</div>
                    </Link>
                    <div className="order_operate">
                      <button
                        onClick={this.handleClickAssess.bind(
                          this,
                          order.num
                        )}
                      >
                        评价
                      </button>
                      <button
                        onClick={this.handleClickReOrder.bind(
                          this,
                          order.storeId
                        )}
                      >
                        再来一单
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <BottomTabBar />
      </div>
    )
  }
}

export default Order
