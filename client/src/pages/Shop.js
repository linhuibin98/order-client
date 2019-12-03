import React, { Component } from "react";
import ShopTabBar from "./shopComponents/ShopTabBar";
import ShopFoodList from './shopComponents/ShopFoodList';
import ShopComment from "./shopComponents/ShopComment";
import ShopInfo from "./shopComponents/ShopInfo";
import BottomCart from './shopComponents/BottomCart';
import { connect } from 'react-redux';
import actions from '../store/actions';
import { getStorage } from '../util/storage';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  // 点餐、评价、商家的Tab切换索引
  setCurrentIndex(index) {
    this.setState({
      currentIndex: index
    });
  }

  // 点击回退
  clickGoback() {
    this.props.history.go(-1);
  }

  componentDidMount() {
    // 获取数据
    let { id } = this.props.match.params;
    this.props.setShopData(id);
    let cart = getStorage('cartList') || {};
    let cartList = cart[id] || [];
    this.props.setCartList({
      id,
      cartList
    });
  }

  render() {
    let { currentIndex } = this.state;
    let { shopData, history, location } = this.props;
    let { id } = this.props.match.params;
    
    return (
      <div className="goods_container">
        <div className="store_detail">
          <nav className="nav_goback" style={{backgroundImage: `url(${shopData['store_pic']})`}}>
            <a className="goback" onClick={this.clickGoback.bind(this)}>
              <i className="iconfont icon-you-copy"></i>
            </a>
          </nav>
          <div className="content">
            <div className="store_logo">
              <img
                src={shopData['store_logo_url']}
                alt="logo"
              />
            </div>
            <div className="store_name">
              <h2>{shopData['store_name']}</h2>
            </div>
            <div className="store_data">
              <span>评价{shopData['store_grade']}</span>
              <span>月售{shopData['store_sales']}单</span>
              <span>约30分钟</span>
            </div>
            <div className="store_notice">
              <span>
                公告: {shopData['store_notice']}
              </span>
            </div>
          </div>
        </div>
        <div className="shop_tab">
          <ShopTabBar
            currentIndex={currentIndex}
            setCurrentIndex={this.setCurrentIndex.bind(this)}
          />
        </div>
        <div className='main_content'>
          {
            currentIndex === 0 ? <ShopFoodList storeId={id} /> : (currentIndex === 1 ? <ShopComment /> : <ShopInfo />) 
          }
        </div>
        <BottomCart history={history} location={location}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setShopData: id => {
      dispatch(actions.shop.getShopData(id));
    },
    setCartList: opts => {
      dispatch(actions.shop.setCartList(opts))
    }
  }
}

export default connect(store => ({ ...store.shop }), mapDispatchToProps)(Shop);