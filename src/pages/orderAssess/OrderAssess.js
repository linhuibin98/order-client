import React, { useState, useEffect, useCallback } from 'react'
import StarRating from '../../components/starRating'
import TagGroup from '../../components/tag-group'
import { reqOrderDetail } from '../../api'
import './orderAssess.less'

const tagList = ['干净卫生', '包装精美', '物美价廉', '味道好', '很实惠', '分量足', '食材新鲜']

function OrderAssess({ match, history }) {
  const [order, setOrder] = useState({})
  const [selectList, setSelectList] = useState({})

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

  // 存储选中的评价标签
  const handleTagClick = useCallback((foodId, value, type) => {
    const cloneSelect = {...selectList}
    if (cloneSelect[foodId]) {
      if (type === 'add') cloneSelect[foodId].push(value)

      if (type === 'remove') cloneSelect[foodId] = cloneSelect[foodId].filter(item => item !== value)
    } else {
      cloneSelect[foodId] = [value]
    }
    setSelectList(cloneSelect)
  }, [selectList])

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
                    <TagGroup tagList={tagList} clickCallback={ handleTagClick.bind(null, food.id) } />
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
