import React, { useState } from 'react'

function Star({marked, starId}) {

  return (
    <span star-id={starId} style={{color: "#ff9933"}} role="button">
      {/* 空心，实星 */}
      {marked ? "\u2605" : "\u2606"}
    </span>
  )
}


function StarRating({ rate }) {
  // 分数显示
  const [rating, setRating] = useState(
    typeof rate === 'number' ? rate : 0
  )

  const [selection, setSelection] = useState(0)
  
  // 鼠标移入事件
  const hoverOver = event => {
    let val = 0
    
    if (event && event.target && event.target.getAttribute("star-id")) {
      val = event.target.getAttribute("star-id")
      setSelection(val)
    }
  }

  // 点击选中分数
  const handleClick = event => {
    setRating(event.target.getAttribute("star-id") || rate)
  }

  return (
    <div
      onMouseOver={hoverOver}
      onClick={handleClick}
      onMouseOut={() => hoverOver(null)}
    >
      { /* 创建5个组件 */ }
      {
        Array.from({ length: 5 }, (v, i) => (
          <Star 
            starId = { i + 1 }
            key={ `star_${i + 1}`}
            marked={ selection ? selection >= i + 1 : rating >= i + 1 }
          />
        ))
      }
    </div>
  )
}

export default StarRating