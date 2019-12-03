import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomTabBar = (props) => {
  return (
    <nav className='tab_bar_container'>
      <NavLink exact to="/" className='tab_item' isActive = {(match, location) => (location.pathname === '/')} activeClassName="selected">
        <i className='iconfont icon-fan'></i>
        <span>首页</span>
      </NavLink>
      <NavLink to="/order" className='tab_item' isActive = {(match, location) => (location.pathname === '/order')} activeClassName="selected">
        <i className='iconfont icon-icon-'></i>
        <span>订单</span>
      </NavLink>
      <NavLink to="/user" className='tab_item' isActive = {(match, location) => (location.pathname === '/user')} activeClassName="selected">
        <i className='iconfont icon-wode'></i>
        <span>我的</span>
      </NavLink>
    </nav>
  )
}

export default BottomTabBar;