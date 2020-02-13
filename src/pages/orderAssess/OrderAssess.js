import React, { useState, useEffect } from 'react'
import StarRating from '../../components/starRating'
import { reqOrderDetail } from '../../api'
import './orderAssess.less'

function OrderAssess({ match, history }) {
  const [order, setOrder] = useState({})

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

  function handleClickTag(e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.classList.toggle('select')
    }
  }

  return (
    <>
      <header className="confim_head">
        <span
          onClick={() => {
            history.goBack()
          }}
        >
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>评价</h1>
      </header>
      <section className="content">
        <div className="shop_info">
          <img className="logo" src={order.storeLogoUrl} alt="" />
          <p className="name">{order.storeName}</p>
        </div>
        <div className="goods">
          <ul className="goods_list">
            <p className="tip">
              <span>商品评价</span>
              <span>（至少完整评价一个）</span>
            </p>
            {order.foods &&
              order.foods.map(food => {
                return (
                  <li className="item" key={ food.id }>
                    <div className="name_rate">
                      <span>{food.name}</span>
                      <StarRating rate={0} />
                    </div>
                    <div className="tags" onClick={handleClickTag}>
                      <button>干净卫生</button>
                      <button>包装精美</button>
                      <button>物美价廉</button>
                      <button>味道好</button>
                      <button>很实惠</button>
                      <button>分量足</button>
                      <button>食材新鲜</button>
                    </div>
                    <div className="text_content">
                      <textarea
                        name="des"
                        id="des"
                        placeholder="说说哪里满意，帮大家选择"
                      ></textarea>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      </section>
      <footer className="footer">发表评价</footer>
    </>
  )
}

export default OrderAssess
