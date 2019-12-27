import React, { Component } from 'react';
import HotSearch from './searchComponents/HotSearch';

export default class Search extends Component {

  handleClickGoBack() {
    window.history.go(-1);
  }

  render() {
    return (
      <div className='search_container'>
        <section className='header-search'>
          <div className="goback" onClick={this.handleClickGoBack}><i className='iconfont icon-you-copy'></i></div>
          <form className="search_input">
            <i className='iconfont icon-sousuo'></i>
            <input type="search" placeholder='输入商家、商品名称' />
            <button className='btn'>搜索</button>
          </form>
        </section>
        <HotSearch />
      </div>
    )
  }
}
