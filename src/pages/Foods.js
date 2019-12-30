import React, { Component } from 'react';
import { getStoreList } from '../api/index';
import { Link } from 'react-router-dom';
import Stars from '../components/Stars';
import  BottomTabBar from '../components/BottomTabBar';
import { connect } from 'react-redux';
import { getStorage } from '../util/storage'

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeList: [],
      currentAddr: ''
    };
  }

  async componentDidMount() {
    let { userInfo: { id } } = this.props;
    let res = await getStoreList();
    let address = getStorage('address');

    let currentAddr = '';

    if (address && address[id]) {
      currentAddr = address[id].address;
    }

    this.setState({
      storeList: res.data.data,
      currentAddr
    })
  }

  handleAddress() {
    let { isLogin, history, location } = this.props;
    if (!isLogin) {
      return history.push({
        pathname: '/user/login',
        state: { from: location.pathname }
      })
    } else {
      return history.push({
        pathname: '/user/address/select',
        state: { from: location.pathname }
      })
    }
  }

  render() {
    let { storeList } = this.state;
    return ( 
      <div className='home_container'>
        <header className='home_header'>
          <div className='header_address' onClick={this.handleAddress.bind(this)}>
            <i className='iconfont icon-zuobiao'></i>
            <span className='address_name'>{ this.state.currentAddr || '添加地址' }</span>
            <i className='icon_trig'></i>
          </div>
          <Link to='/search' className="search_input">
            <div className='ipt'><i className='iconfont icon-sousuo'></i><span>搜索附近商家、商品名称</span></div>
          </Link>
        </header>
        <section className='recommended_merchants'>
          <span className='split'>——</span>
          <span className='title'>推荐商家</span>
          <span className='split'>——</span>
        </section>
        <section className='merchants'>
          <ul className='merchant_list'>
            {
              storeList.map(store => (
                <li className='merchant_item' key={store._id}>
                  <Link to={`/shop/${store._id}`} className='merchant_detail'>
                    <div className='left_logo'>
                      <img src={store.store_logo_url} alt='logo' />
                    </div>
                    <div className='text_detail'>
                      <div className='name'>
                        <h2>{store.store_name}</h2>
                        <span>...</span>
                      </div>
                      <div className='rate_num'>
                        <div className='stars'>
                          <Stars rate={store.store_grade} />
                          <span>{store.store_grade}</span>
                        </div>
                        <p>商家配送</p>
                      </div>
                      <div className='dispatch'>
                        <div><span>￥{store.startup_cost}起送</span><span className='split'>|</span><span>{store.distribution_cost ? `配送费￥${store.distribution_cost}` : '免配送费'}</span></div>
                        <div><span>718m</span><span className='split'>|</span>30分钟<span></span></div>
                      </div>
                    </div>
                  </Link>
                  <div className='coupon_detail'></div>
                </li>
              ))
            }
          </ul>
        </section>
        <BottomTabBar />
      </div>
    )
  }
}


export default connect(state => ({ ...state.user }))(Food);