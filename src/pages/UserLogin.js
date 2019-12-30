import React, { useRef, useEffect } from 'react';
import Toast from '../components/toast';
import actions from '../store/actions/userActions';
import { connect } from 'react-redux';
import formatSearch from '../util/formatSearch';
import { setStorage, getStorage } from '../util/storage';
import { requestUserLogin } from '../api';

function UserLogin(props) {
  let { history, location, userLogin, isLogin } = props;

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);

  function handleGoBack() {
    history.go(-1);
  }

  async function handleClickLogin() {
    let username = usernameRef.current.value,
      password = passwordRef.current.value;

    if (username === '' || password === '') {
      return Toast.error('请输入账号密码');
    }

    const result = await requestUserLogin({
      username,
      password
    });

    // 登录成功
    if (result.status === 200 && result.data.errorCode === 0) {
      let params = formatSearch(location.search);
      let toPath = params.redirect || '/';

      let { userInfo, avatar, message, token } = result.data;
      Toast.success(message);
      // 更新缓存中的token、avatar
      let avatars = getStorage('avatar');
      setStorage('token', token);
      setStorage('avatar', { ...avatars, [userInfo.id]: avatar});

      // userInfo  avata、信息存放在redux中
      userLogin({
        userInfo
      });
      history.replace(toPath);

    } else {
      Toast.error(result.data.message);
    }
  }

  useEffect(() => {
    if (isLogin) {
      let params = formatSearch(location.search);
      let toPath = params.redirect || '/';
      history.replace(toPath);
    }
  }, [history, isLogin, location.search])

  return (
    <div className='login_wrapper'>
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>用户登陆</h1>
      </header>
      <section className='form_group'>
        <div className='form'>
          <input ref={usernameRef} id='username' name='username' type="text" placeholder='请输入用户名或手机号' />
          <input ref={passwordRef} type="password" name="password" id="password" placeholder='请输入密码' />
          <button className='btn' onClick={handleClickLogin}>登陆</button>
        </div>
      </section>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (opts) => {
      return dispatch(actions.userLogin({
        ...opts
      }))
    }
  }
}

export default connect(store => ({ isLogin: store.user.isLogin }), mapDispatchToProps)(UserLogin);