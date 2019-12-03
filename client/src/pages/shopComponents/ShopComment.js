import React from 'react';
import Stars from '../../components/Stars';
import { connect } from 'react-redux';

function ShopComment(props) {
  console.log('====================================');
  console.log(props);
  console.log('====================================');

  return (
    <div className='shop_comment_container'>
      <section className='shop_rate'>
        <div className='rate'>
          <p>4.6</p>
          <div className='rate_icon'>
            <span>商家评分</span>
            <Stars rate={4.6} />
          </div>
        </div>
        <div className='taste_score'>
          <div className='taste'>
            <span>味道</span>
            <span>4.6</span>
          </div>
          <div className='taste'>
            <span>包装</span>
            <span>4.6</span>
          </div>
        </div>
        <div className='dispatch_rate'>
          <span>配送</span>
          <span>5.0</span>
        </div>
      </section>
      <section className='comment_wrapper'>
        
      </section>
    </div>
  )
}

export default connect(store => ({...store.shop}))(ShopComment);