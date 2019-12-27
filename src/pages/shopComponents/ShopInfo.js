import React from 'react';

export default function ShopInfo() {

  return (
    <div className='shop_info_wrapper'>
      <section className='dispatch_info'>
        <h3>配送信息</h3>
        <p>约30分钟送达，距离593m</p>
        <p>配送费￥0</p>
      </section>
      <section className='merchant_service'>
        <h3>商家服务</h3>
        <p>该商户食品安全已由国泰产险承担，食品安全有保障</p>
      </section>
      <section className='merchant_info'>
        <h3>商家信息</h3>
        <ul>
          <li>本店优先配送饿了么　速度更快价格更爽　这么奋斗的你不就是为吃顿好的么　在品味美食的路上寻找爱　你只需轻轻按下手机　放松心情　躺在床上　听听音乐　美食就在路上　一份外卖满满的都是爱</li>
          <li>
            <span>品类</span>
            <span>其他菜系,盖浇饭</span>
          </li>
          <li>
            <span>商家电话</span>
            <a href="tel:10086">
              <i className='iconfont icon-dianhua'></i>
              <span>商家电话</span>
            </a>
          </li>
          <li>
            <span>地址</span>
            <span>九江市共青城市金纺路西侧乘风花园39号</span>
          </li>
          <li>
            <span>营业时间</span>
            <span>09:00-14:00,16:30-21:00</span>
          </li>
        </ul>
      </section>
      <section className='qualifal'>
        <h3>营业资质</h3>
      </section>
    </div>
  )
}