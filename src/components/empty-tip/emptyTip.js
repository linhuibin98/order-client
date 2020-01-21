import React from 'react'
import './emptyTip.less'

function emptyTip(props) {
  return <div className="empty_data">{props.content || '数据为空~~~'}</div>
}

export default emptyTip
