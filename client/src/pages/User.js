import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BottomTabBar from '../components/BottomTabBar';

class User extends Component {

  constructor(props) {
    super(props);
  }

  handleClickRegister() {
    this.props.history.push('/user/register');
  }

  handleClickLogin() {
    this.props.history.push({
      pathname: '/user/login',
      state: {
        from: '/user'
      }
    });
  }

  render() {
    let { userInfo: { username, phone } } = this.props;

    return (
      <div className='user_container'>
        {
          username ? (
            <header className='user_detail'>
              <div className='profile'>
                <div className='avatar'><img src="https://cube.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed" alt="" /></div>
                <div className='profile_text'><span>{username}</span><span>{phone}</span></div>
              </div>
              <span className='split'>></span>
            </header>
          ) : (
              <header className='user_login'>
                <button className='register btn' onClick={this.handleClickRegister.bind(this)}>注册</button>
                <button className='login btn' onClick={this.handleClickLogin.bind(this)}>登陆</button>
              </header>
            )
        }
        {
          /*
            <section className='coupon'>
          <div className='red_packets con'>
            <p><span>3</span>个</p>
            <span>红包</span>
          </div>
          <div className='integral con'>
            <p><span>3</span>个</p>
            <span>积分</span>
          </div>
        </section>
          */
        }
        <section className='address_b'>
          <div className='icon'><i className='iconfont icon-dizhi'></i></div>
          <Link className='address' to='/user/address'>
            <span>我的地址</span>
            <span>></span>
          </Link>
        </section>
        <section className='help_container'>
          <div className='help'>
            <div className='help-i'><i className='iconfont icon-kefu'></i></div>
            <div className='help-t'>
              <span>我的客服</span>
              <span>></span>
            </div>
          </div>
          <div className='help'>
            <div className='help-i'><i className='iconfont icon-app'></i></div>
            <div className='help-t'>
              <span>下载APP</span>
              <span>></span>
            </div>
          </div>
          <div className='help'>
            <div className='help-i'><i className='iconfont icon-guize'></i></div>
            <div className='help-t gua'>
              <span>规则中心</span>
              <span>></span>
            </div>
          </div>
        </section>
        <BottomTabBar />
      </div>
    )
  }
}

export default withRouter(connect(state => ({ ...state.user }))(User));