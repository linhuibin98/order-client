import React, { useState, useEffect } from 'react'
import formateDate from '../util/formatDate'
import { reqOrderDetail } from '../api'

function OrderDetail(props) {
  let [order, setOrder] = useState({})
  let { match } = props

  useEffect(() => {
    let { orderNum } = match.params
    ;(async () => {
      let result = await reqOrderDetail(orderNum)
      if (result.status === 200 && result.data.errorCode === 0) {
        setOrder(result.data.data)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleGoBack() {
    props.history.go(-1)
  }

  return (
    <div className="order_detail_container">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>订单详情</h1>
      </header>
      <section className="order_group">
        <div className="title">订单信息</div>
        <ul>
          <li className="order_item">订单号：{order.num}</li>
          <li className="order_item">支付方式: 在线支付</li>
          <li className="order_item">下单时间: {formateDate(order.time)}</li>
        </ul>
      </section>
    </div>
  )
}

export default OrderDetail
