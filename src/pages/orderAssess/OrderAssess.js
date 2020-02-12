import React from 'react'
import Stars from '../../components/Stars'
import './orderAssess.less'

function OrderAssess(props) {
  function handleClickTag(e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.classList.toggle('select')
    }
  }

  return (
    <>
      <header className="confim_head">
          <span onClick={() => {props.history.goBack()}}>
            <i className="iconfont icon-you-copy"></i>
          </span>
          <h1>评价</h1>
      </header>
      <section className='content'>
        <div className='shop_info'>
          <img className='logo' src="https://cube.elemecdn.com/1/10/94e068597d5b90407fff916adc0ecpng.png?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed" alt=""/>
          <p className='name'>吉客餐厅</p>
        </div>
        <div className='goods'>
          <ul className='goods_list'>
            <p className='tip'><span>商品评价</span><span>（至少完整评价一个）</span></p>
            <li className='item'>
              <div className='name_rate'>
                <span>奶茶(大杯)</span>
                <Stars rate={4} />
              </div>
              <div className='tags' onClick={handleClickTag}>
                <button>干净卫生</button>
                <button>包装精美</button>
                <button>物美价廉</button>
                <button>味道好</button>
                <button>很实惠</button>
                <button>分量足</button>
                <button>食材新鲜</button>
              </div>
              <div className='text_content'>
                <textarea name="des" id="des" placeholder='说说哪里满意，帮大家选择'></textarea>
              </div>
            </li>
            <li className='item'>
              <div className='name_rate'>
                <span>奶茶(大杯)</span>
                <Stars rate={4} />
              </div>
              <div className='tags' onClick={handleClickTag}>
                <button>干净卫生</button>
                <button>包装精美</button>
                <button>物美价廉</button>
                <button>味道好</button>
                <button>很实惠</button>
                <button>分量足</button>
                <button>食材新鲜</button>
              </div>
              <div className='text_content'>
                <textarea name="des" id="des" placeholder='说说哪里满意，帮大家选择'></textarea>
              </div>
            </li>
            <li className='item'>
              <div className='name_rate'>
                <span>奶茶(大杯)</span>
                <Stars rate={4} />
              </div>
              <div className='tags' onClick={handleClickTag}>
                <button>干净卫生</button>
                <button>包装精美</button>
                <button>物美价廉</button>
                <button>味道好</button>
                <button>很实惠</button>
                <button>分量足</button>
                <button>食材新鲜</button>
              </div>
              <div className='text_content'>
                <textarea name="des" id="des" placeholder='说说哪里满意，帮大家选择'></textarea>
              </div>
            </li>
            <li className='item'>
              <div className='name_rate'>
                <span>奶茶(大杯)</span>
                <Stars rate={4} />
              </div>
              <div className='tags' onClick={handleClickTag}>
                <button>干净卫生</button>
                <button>包装精美</button>
                <button>物美价廉</button>
                <button>味道好</button>
                <button>很实惠</button>
                <button>分量足</button>
                <button>食材新鲜</button>
              </div>
              <div className='text_content'>
                <textarea name="des" id="des" placeholder='说说哪里满意，帮大家选择'></textarea>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <footer className='footer'>
        发表评价
      </footer>  
    </>
  )
}

export default OrderAssess