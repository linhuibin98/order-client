import React, { useState } from 'react';

export default function ShopTabBar(props) {
  let [tabList] = useState(['点餐', '评价', '商家']);

  let { currentIndex, setCurrentIndex } = props;

  return (
    <nav className='shop_tabbar'>
      {
        tabList.map((tab, index) => (
          <div className='tabbar_item' key={index + ''} onClick={() => setCurrentIndex(index)}>{tab}<span className={currentIndex === index ? 'active' : ''}></span></div>
        ))
      }
    </nav>
  )
}