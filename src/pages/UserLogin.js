import React, { useRef, useEffect, useState } from "react";
import Toast from "../components/toast";
import actions from "../store/actions/userActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import formatSearch from "../util/formatSearch";
import { setStorage, getStorage } from "../util/storage";
import { requestUserLogin } from "../api";
import  drawPic from '../util/drawPic';

function UserLogin(props) {
  let { history, location, userLogin } = props;

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  let canvasRef = useRef(null);
  let codeRef = useRef(null);
  let [code, setCode] = useState('');

  function handleGoBack() {
    let redirect = formatSearch(location.search);

    redirect ? history.replace(redirect) : history.goBack();
  }

  async function handleClickLogin() {
    let username = usernameRef.current.value,
      password = passwordRef.current.value,
      valideteCode = codeRef.current.value;

    if (username === "" || password === "") {
      return Toast.error("请输入账号密码");
    }

    if (valideteCode === '') {
      return Toast.error("请输入验证码");
    }

    if (valideteCode.toUpperCase() !== code) {
      return Toast.error("验证码错误");
    }

    const result = await requestUserLogin({
      username,
      password
    });

    // 登录成功
    if (result.status === 200 && result.data.errorCode === 0) {

      let { userInfo, avatar, message, token } = result.data;
      Toast.success(message);
      // 更新缓存中的token、avatar
      let avatars = getStorage("avatar");
      setStorage("token", token);
      setStorage("avatar", { ...avatars, [userInfo.id]: avatar });

      // userInfo  avata、信息存放在redux中
      userLogin({
        userInfo,
        isLogin: true
      });
     if (location.state && location.state.from) {
        history.replace(location.state.from);
     } else {
      handleGoBack();
     }
    } else {
      Toast.error(result.data.message);
    }
  }

  function generatorValidateCode() {
    let generatorCode = drawPic(canvasRef.current);
    setCode(generatorCode);
  }

  useEffect(() => {
    generatorValidateCode();
  }, []);

  return (
    <div className="login_wrapper">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>用户登陆</h1>
      </header>
      <section className="form_group">
        <div className="form">
          <input
            ref={usernameRef}
            id="username"
            name="username"
            type="text"
            placeholder="请输入用户名或手机号"
            defaultValue='15170729230'
          />
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            defaultValue='123456'
          />
          <div className="box">
            <input ref={codeRef} type="text" id="validate" placeholder="验证码" defaultValue={code} />
            <canvas
              ref={canvasRef}
              id="canvas"
              width="100"
              height="32"
              onClick={generatorValidateCode}
            ></canvas>
          </div>
          <button className="btn" onClick={handleClickLogin}>
            登录
          </button>
          <Link to="/user/register" className="register">
            没有账号？<span>去注册</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: opts => {
      return dispatch(
        actions.userLogin({
          ...opts
        })
      );
    }
  };
};

export default connect(
  store => ({ isLogin: store.user.isLogin }),
  mapDispatchToProps
)(UserLogin);
