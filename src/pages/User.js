import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BottomTabBar from '../components/BottomTabBar';
import { getAvatar } from '../api';
import actions from '../store/actions';

class User extends Component {

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

  historyToInfo() {
    this.props.history.push('/user/info');
  }

  componentDidMount() {
    let { userInfo: { id }, updateAvatar } = this.props;
    (async () => {
      if (id) {
        let res = await getAvatar(id);
        updateAvatar(res.data.avatar);
      }
    })()
  }

  render() {
    let { userInfo: { username, phone }, avatar } = this.props;

    return (
      <div className='user_container'>
        {
          username ? (
            <header className='user_detail' onClick={this.historyToInfo.bind(this)}>
              <div className='profile'>
                <div className='avatar'><img src={avatar || "https://cube.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed"} alt="" /></div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAvatar: (url) => {
      dispatch(actions.user.userChangeAvatar(url));
    }
  }
}

export default withRouter(connect(state => ({ ...state.user }), mapDispatchToProps)(User));