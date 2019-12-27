import React, {useRef, useEffect, useState} from 'react';
import Toast from '../components/toast';
import actions from '../store/actions/userActions';
import { connect } from 'react-redux';

function UserLogin(props) {
  let { isLogin, history, location, userLogin } = props;

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  let [from, setFrom] = useState('');

  useEffect(() => {
    let fromLocation = location.state && location.state.from;
    if ((fromLocation === '/order' || fromLocation === '/user/address') && isLogin) {
      history.push(fromLocation);
    } else if(isLogin) {
      history.push('/');
    } else if (/(\/shop)/.test(fromLocation) && !isLogin) {
      Toast.error('还未登陆, 请登陆...');
      setFrom(fromLocation);
    } else {
      setFrom(fromLocation);
    }
  }, [isLogin])

  function handleGoBack() {
    history.go(-1);
  }

  async function handleClickLogin() {
    let username = usernameRef.current.value,
        password = passwordRef.current.value;

    if (username === '' || password === '') {
      return Toast.error('请输入账号密码');
    }

    userLogin({
      username,
      password,
      history,
      from
    });
  } 
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
            <input ref={usernameRef} id='username' name='username' type="text" placeholder='请输入用户名或手机号'/>
            <input ref={passwordRef} type="password" name="password" id="password" placeholder='请输入密码'/>
          <button className='btn' onClick={handleClickLogin}>登陆</button>
        </div>
      </section>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (opts) => {
      dispatch(actions.userLogin({
        ...opts
      }))
    }
  }
}

export default connect(store => ({...store.user}), mapDispatchToProps)(UserLogin);