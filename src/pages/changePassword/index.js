import React, { useRef } from 'react';
import './index.less';
import { changePassword } from '../../api';
import Toast from '../../components/toast';
import { connect } from 'react-redux';
import { setStorage } from '../../util/storage';
import actions from '../../store/actions';

function ChangePassword(props) {
  const { history, validateToken } = props;

  const oldInput = useRef(null);
  const newInput = useRef(null);

  function handleGoBack() {
    history.goBack();
  }

  async function confirmChange() {
    let oldPassword = oldInput.current.value;
    let newPassword = newInput.current.value;

    const passExp = /^\S{6,16}$/;

    if (!(passExp.test(oldPassword) || passExp.test(newPassword))) {
      return Toast.error('密码长度为6-16字符');
    }

    let result = await changePassword({ oldPassword, newPassword });

    if (result.status === 200 && result.data.errorCode === 0) {
      setStorage('token', "");
      validateToken({
        userInfo: {},
        isLogin: false
      })
      history.push('/user');
      return Toast.success(result.data.message);
    }
    Toast.error(result.data.message);
  }

  return (
    <div className='password_container'>
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>修改密码</h1>
      </header>
      <section className='form_group'>
        <label htmlFor="old_pass">
          旧密码：
          <input ref={oldInput} type="password" name="old" id="old_pass" />
        </label>
        <label htmlFor="new_pass">
          新密码：
          <input ref={newInput} type="password" name="new" id="new_pass" />
        </label>
        <button onClick={confirmChange}>确认修改</button>
      </section>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    validateToken: (data) => {
      dispatch(actions.user.userValidate(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(ChangePassword);