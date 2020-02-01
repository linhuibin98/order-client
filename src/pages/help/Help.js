import React from 'react'
import FooterBar from './children/FooterBar'
import './help.less'

function Help(props) {
  function handleGoBack() {
    props.history.goBack()
  }

  return (
    <div className='page_help'>
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>我的客服</h1>
      </header>
      
      <FooterBar />
    </div>
  )
}

export default Help
