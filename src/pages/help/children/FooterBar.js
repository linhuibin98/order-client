import React from 'react'

function FooterBar() {
  return (
    <div className="footer_bar">
      <section className='tool_bar'>
        <ul className='scroll_view'>
          <li className='scroll_item'>我要催单</li>
          <li className='scroll_item'>我要退单</li>
          <li className='scroll_item'>我要投诉</li>
          <li className='scroll_item'>退单被拒</li>
        </ul>
      </section>
      <section className='editor_wrapper'>
        <span className='tool'>+</span>
        <div className='edit'>
          <input type="text"/>
        </div>
        <span className='send'>+</span>
      </section>
    </div>
  )
}

export default FooterBar
