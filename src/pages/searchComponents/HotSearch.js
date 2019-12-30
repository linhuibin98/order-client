import React, { useState, useEffect } from 'react';

export default function HotSearch(props) {

  let [historySearchList, setHistorySearchList] = useState([]);

  useEffect(() => {
    let searchList = window.localStorage.getItem('historySearchList');
    console.log(searchList);
    searchList = (searchList && window.JSON.parse(searchList)) || [];
    setHistorySearchList(searchList);
  }, []) 

  function handleClickClear() {
    window.localStorage.setItem('historySearchList', '');
    setHistorySearchList([]);
  }

  return (
    <>
      {
        !historySearchList.length ? '' : (
          <section className='history_search_wrapper'>
            <header className='search_title'>
              <span>历史搜索</span>
              <div aria-label='清楚历史搜索' role='button' onClick={handleClickClear}><i className='iconfont icon-lajitong'></i></div>
            </header>
            <section className='search_content'>
            {
              historySearchList.map((item, index) => {
                return (
                  <button className='search_item' key={index}>{item}</button>
                )
              })
            }
            </section>
          </section>
        ) 
      }
      <section className='hot_search_wrapper'>
        <header className='search_title'>热门搜索</header>
        <section className='search_content'>
          <button className='search_item'>过桥米线</button>
          <button className='search_item'>奶茶</button>
          <button className='search_item'>原创</button>
          <button className='search_item'>黄焖鸡</button>
          <button className='search_item'>煲仔饭</button>
        </section>
      </section>
    </>
  )
}