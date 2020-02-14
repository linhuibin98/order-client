import React from 'react'
import PropTypes from 'prop-types'
import Tag from '../tag'
import './tag-group.less'

TagGroup.propTypes = {
  tagList: PropTypes.array,
  clickCallback: PropTypes.func,
  closable: PropTypes.bool
}

function TagGroup(props) {
  const { tagList, clickCallback, closable } = props
  return (
    <div className="tag_group">
      {tagList.map((value, index) => {
        return <Tag 
                key={value + index} 
                clickCallback={clickCallback || null} 
                closable={closable}>
                  {value}
                </Tag>
      })}
    </div>
  )
} 

export default React.memo(TagGroup)