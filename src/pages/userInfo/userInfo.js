import React from 'react';
import './userInfo.less';
import { connect } from 'react-redux';
import { setStorage } from '../../util/storage';
import actions from '../../store/actions';

function UserInfo(props) {
  let { userInfo, validateToken, history, avatar } = props;

  function handleQuit() {
    setStorage('token', "");
    validateToken({
      data: {
        errorCode: 1,
        message: '登录实效, 请重新登陆...'
      }
    })
    history.push({
      pathname: '/user/login',
      state: { from: '/user' }
    })
  }

  function historyToAvatar() {
    history.push('/user/avatar');
  }

  return (
    <div className='user_info_contaienr'>
      <div className='avatar item' onClick={ historyToAvatar }>
        <b>头像</b>
        <div className='avatar_img'>
          <img src={ avatar || "https://cube.elemecdn.com/0/d0/dd7c960f08cdc756b1d3ad54978fdjpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed" } alt=""/>
          <span className='icon'>></span>
        </div>
      </div>
      <div className='username item'>
        <b>用户名</b>
        <span>{ userInfo.username }</span>
      </div>
      <h2>账号绑定</h2>
      <div className='phone item'>
        <b>手机</b>
        <span className='content'>
          <span>{ userInfo.phone }</span>
          <span className='icon'>></span>
        </span>
      </div>
      <h2>安全设置</h2>
      <div className='phone item'>
        <b>登录密码</b>
        <span className='content'>
          <span className='change_text'>修改</span>
          <span className='icon'>></span>
        </span>
      </div>
      <button className='back_btn' onClick={ handleQuit }>退出登录</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    validateToken: (res) => {
      dispatch(actions.user.userValidate(res));
    }
  }
}

export default connect(state => ({ userInfo: state.user.userInfo, avatar: state.user.avatar }), mapDispatchToProps)(UserInfo);