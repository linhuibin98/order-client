import React from 'react';

export default function Stars (props) {

  let { rate } = props;

  let FloorRate = Math.floor(rate),
      decRate = rate - FloorRate,
      emptyRate = Math.floor(5 - rate),
      fullStar = [],
      halfStar = [],
      emptyStar = [],
      stars = [];

  for (let i = 0; i < FloorRate; i++) {
    fullStar.push((<i className='iconfont icon-pingfen' style={{color: '#FFCB00'}} key={'' + i + FloorRate}></i>))
  }
  
  decRate > 0.5 && halfStar.push((<i className='iconfont icon-xing' style={{color: '#FFCB00'}} key={'' + decRate}></i>))

  for (let i = 0; i < emptyRate; i++) {
    emptyStar.push((<i className='iconfont icon-pingfen' style={{color: '#eee'}} key={i}></i>));
  }

  stars = [...fullStar, ...halfStar, ...emptyStar];
  return (
    <div className='star_wrapper'>
      {stars}
    </div>
  )
}