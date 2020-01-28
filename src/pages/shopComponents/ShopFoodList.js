/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react'
import ShopCommend from './ShopCommend'
import isCart from '../../util/isCart'
import PropTypes from 'prop-types'

ShopFoodList.propTypes = {
  cartList: PropTypes.array,
  shopData: PropTypes.object,
  updataCartList: PropTypes.func
}

function ShopFoodList(props) {
  // 当前菜单所在位置
  let [currentMenuIndex, setCurrentMenuIndex] = useState(0)
  let scroller = useRef(null)
  const { shopData, cartList } = props

  let { foods_commend, store_categories } = shopData

  function handleChangeMenu(e) {
    let index = e.currentTarget.getAttribute('data-index')
    // eslint-disable-next-line eqeqeq
    if (currentMenuIndex == index) return
    setCurrentMenuIndex(parseInt(index))

    const scrollerEl = scroller.current
    const scrollerChildren = scroller.current.children

    if (!scrollerChildren[index]) {
      // 不存在直接退出
      return
    }

    let targetTop = scrollerChildren[index].offsetTop
    scrollerEl.scrollTop = targetTop
  }

  function handleAddToCart(e) {
    let name = e.currentTarget.getAttribute('data-name')
    let id = e.currentTarget.getAttribute('data-id')
    let price = e.currentTarget.getAttribute('data-price')
    let pic = e.currentTarget.getAttribute('data-pic')

    let flag = false

    let cloneCartList = JSON.parse(JSON.stringify(cartList))

    cloneCartList = cloneCartList.map(item => {
      if (item.id === id) {
        flag = true // 已经在购物车中, 数量加1
        item.num = item.num + 1
        return item
      }
      return item
    })

    !flag &&
      cloneCartList.push({
        // 加入购物车
        name,
        id,
        price,
        pic,
        num: 1
      })

    // 更新购物车数据
    props.updataCartList(cloneCartList)
  }

  function handleReduceCart(e) {
    let id = e.currentTarget.getAttribute('data-id')

    let cloneCartList = JSON.parse(JSON.stringify(cartList))

    let index = cloneCartList.findIndex(item => item.id === id)

    let num = cloneCartList[index].num

    if (num === 1) {
      cloneCartList.splice(index, 1)
    } else {
      cloneCartList[index].num -= 1
    }

    // 更新购物车数据
    props.updataCartList(cloneCartList)
  }

  return (
    <>
      {foods_commend && !foods_commend['length'] ? (
        ''
      ) : (
        <ShopCommend
          cartList={cartList}
          handleAddToCart={handleAddToCart}
          handleReduceCart={handleReduceCart}
          shopData={shopData}
        />
      )}
      <div className="menuview_wrapper">
        <main className="menuview_main">
          <div className="left_menu">
            <ul className="menu_category">
              {store_categories &&
                store_categories.map((cat, i) => {
                  return !cat.children.length ? (
                    ''
                  ) : (
                    <li
                      className={
                        i === currentMenuIndex
                          ? 'menu_item active'
                          : 'menu_item'
                      }
                      data-index={i}
                      onClick={handleChangeMenu}
                      key={i}
                    >
                      {cat.cat_name}
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className="right_content">
            <div ref={scroller} className="scroller">
              {store_categories &&
                store_categories.map((cat, i) => {
                  return !cat.children.length ? (
                    ''
                  ) : (
                    <dl key={i}>
                      <dt>
                        <div className="food_title">
                          <strong>{cat.cat_name}</strong>
                          {i === 0 ? <span>大家喜欢吃，才叫真好吃。</span> : ''}
                        </div>
                      </dt>
                      {cat.children.map((item, index) => {
                        return (
                          <dd key={index}>
                            <div className="food_detail_wrapper">
                              <span className="food_pic">
                                <img
                                  src={
                                    item.food_pic ||
                                    'http://pic.51yuansu.com/pic3/cover/01/55/70/594c83ce7e5b3_610.jpg'
                                  }
                                  alt=""
                                />
                              </span>
                              <section className="food">
                                <div className="food_detail">
                                  <p className="food_name">{item.food_name}</p>
                                  <p className="food_desc">
                                    {item.food_ingredient}
                                  </p>
                                  <p className="food_sales">
                                    <span>月售{item.food_sales}份</span>
                                    <span>好评率100%</span>
                                  </p>
                                </div>
                                <div className="food_card">
                                  <span>￥{item.food_price}</span>
                                  <span className="operate">
                                    {!isCart(cartList, item.food_id) ? (
                                      ''
                                    ) : (
                                      <>
                                        <a
                                          data-id={item.food_id}
                                          onClick={handleReduceCart}
                                        >
                                          <i className="iconfont icon-jian"></i>
                                        </a>
                                        <span>
                                          {isCart(cartList, item.food_id).num}
                                        </span>
                                      </>
                                    )}
                                    <a
                                      data-name={item.food_name}
                                      data-id={item.food_id}
                                      data-pic={
                                        item.food_pic ||
                                        'http://pic.51yuansu.com/pic3/cover/01/55/70/594c83ce7e5b3_610.jpg'
                                      }
                                      data-price={item.food_price}
                                      onClick={handleAddToCart}
                                    >
                                      <i className="iconfont icon-add"></i>
                                    </a>
                                  </span>
                                </div>
                              </section>
                            </div>
                          </dd>
                        )
                      })}
                    </dl>
                  )
                })}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ShopFoodList
