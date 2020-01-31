import React, { Component } from 'react'
import { reqHomeData } from '../api/index'
import { Link } from 'react-router-dom'
import StoreList from '../components/storeList'
import BottomTabBar from '../components/BottomTabBar'
import Carousel from '../components/carousel'
import { connect } from 'react-redux'
import { getStorage } from '../util/storage'

@connect(state => ({ ...state.user }))
class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storeList: [],
      currentAddr: '',
      carouselList: []
    }
  }

  async componentDidMount() {
    let result = await reqHomeData()

    this.setState({
      storeList: result[0].data.data,
      carouselList: result[1].data.data
    })
  }

  handleAddress() {
    let { isLogin, history, location } = this.props
    let toPath = isLogin ? '/user/address/select' : '/user/login'
    history.push({
      pathname: toPath,
      search: `?redirect=${location.pathname}`
    })
  }

  render() {
    let {
      userInfo: { id }
    } = this.props
    let { storeList, carouselList } = this.state
    let address = getStorage('address')

    let currentAddr = ''

    if (address && address[id]) {
      currentAddr = address[id].address
    }

    return (
      <div className="home_container">
        <header className="home_header">
          <div
            className="header_address"
            onClick={this.handleAddress.bind(this)}
          >
            <i className="iconfont icon-zuobiao"></i>
            <span className="address_name">{currentAddr || '添加地址'}</span>
            <i className="icon_trig"></i>
          </div>
          <Link to="/search" className="search_input">
            <div className="ipt">
              <i className="iconfont icon-sousuo"></i>
              <span>搜索附近商家、商品名称</span>
            </div>
          </Link>
        </header>
        <section className="carousel">
          <Carousel>
            {carouselList.map((item, index) => {
              return (
                <Link to={item.path} key={index}>
                  <img src={item.imgSrc} alt={'car' + index} />
                </Link>
              )
            })}
          </Carousel>
        </section>
        <section className="recommended_merchants">
          <span className="split">——</span>
          <span className="title">推荐商家</span>
          <span className="split">——</span>
        </section>
        <section className="merchants">
          <StoreList storeList={storeList} />
        </section>
        <BottomTabBar />
      </div>
    )
  }
}

export default Food
