import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import './tag.less'

/**
 * @param {closable} 标签是否可以关闭
 */

Tag.propTypes = {
  closable: PropTypes.bool,
  clickCallback: PropTypes.func
}

function Tag(props) {
  let { children, closable, clickCallback } = props

  let tag = createRef()

  const handleClick = () => {
    tag.current.classList.toggle('select')
    clickCallback && clickCallback(tag.current.innerText)
  }

  const handleClose = () => {
    tag.current.style.display = 'none'
  }

  return (
    <button 
      className='tag'
      ref={tag}
      onClick={ clickCallback ? handleClick : null }>
      { children }
      { closable && <span className='closeBtn' onClick={ handleClose }>x</span> }
    </button>
  )
}

export default React.memo(Tag)
