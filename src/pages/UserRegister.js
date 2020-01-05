import React, {useRef} from 'react';
import Toast from '../components/toast';
import { userRegister } from '../api';
import { Link } from 'react-router-dom';

function UserRegister(props) {

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  let phoneRef = useRef(null);

  function handleGoBack() {
    props.history.go(-1);
  }

  async function handleClickRegister() {
    let username = usernameRef.current.value,
        phone = phoneRef.current.value,
        password = passwordRef.current.value,
        nameExp = /^\S{2,16}$/,
        phoneExp = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        passExp = /^\S{6,16}$/;

    if (username === '' || phone === '' || password === '') {
      return Toast.error('手机号、用户名、密码不能为空');
    } else if (!nameExp.test(username)) {
      return Toast.error('用户名不合法');
    } else if (!phoneExp.test(phone)) {
      return Toast.error('手机号不合法')
    } else if (!passExp.test(password)) {
      return Toast.error('密码长度为6-16');
    }

    let res = await userRegister({
      username,
      phone,
      password
    });

    if (res.status === 200 && res.data.errorCode === 0) {
      props.history.push('/user/login');
    } 
    return Toast.success(res.data.message+', 请登录', 5000);
  }

  return (
    <div className='register_wrapper'>
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>用户注册</h1>
      </header>
      <section className='form_group'>
        <div className='form'>
          <label htmlFor="phone">
            手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:
            <input type="text" name='phone' id='phone' ref={phoneRef}/>
          </label>
          <label htmlFor="username">
            用&nbsp;户&nbsp;名: 
            <input id='username' name='username' type="text" ref={usernameRef}/>
          </label>
          <label htmlFor="password">
            密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:
            <input type="password" name="password" id="password" ref={passwordRef}/>
          </label>
          <button className='btn' onClick={handleClickRegister}>注册</button>
          <Link to="/user/login" className="login-tip">
            已有账号？<span>去登录</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default UserRegister;