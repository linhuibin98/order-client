import React, { useRef, useState, useEffect } from "react";
import Toast from '../components/toast';
import { connect } from 'react-redux';
import actions from '../store/actions';

function AddressAdd(props) {
  let { history, userInfo, addDre, location } = props;

  let linkRef = useRef(null);
  let phoneRef = useRef(null);
  let addressRef = useRef(null);
  let detailRef = useRef(null);

  let [from, setFrom] = useState('');

  useEffect(() => {
    let fromLocation = location.state && location.state.from;

    setFrom(fromLocation);
  }, [location.state, setFrom])

  function handleGoBack() {
    history.goBack();
  }

  function handleConfirm() {
    let linkVal = linkRef.current.value;
    let phoneVal = phoneRef.current.value;
    let addVal = addressRef.current.value;
    let deVal = detailRef.current.value;

    if (!linkVal || !phoneVal || !addVal || !deVal) {
      return Toast.warning('不能为空, 必须填写...');
    }

    addDre({
      id: userInfo.id,
      address: {
        name: linkVal,
        phone: phoneVal,
        address: addVal + deVal
      },
      history,
      from
    });

  }

  return (
    <div className="add_address">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>添加地址</h1>
      </header>
      <main className="content">
        <div className='form'>
          <div className="linkman">
            <span>联系人</span>
            <input ref={linkRef} type="text" placeholder="姓名" />
          </div>
          <div className="linkman">
            <span>电话</span>
            <input ref={phoneRef} type="text" placeholder="手机号码" />
          </div>
          <div className="linkman">
            <span>地址</span>
            <input ref={addressRef} type="text" placeholder="小区/写字楼/学校" />
          </div>
          <div className="linkman">
            <span>详细</span>
            <input ref={detailRef} type="text" placeholder="门牌号" />
          </div>
        </div>
        <div className='form_btn'>
          <button className='btn' onClick={handleConfirm}>确定</button>
        </div>
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDre: data => {
      dispatch(actions.user.userAddAddress(data))
    }
  }
}

export default connect(state => ({userInfo: state.user.userInfo}), mapDispatchToProps)(AddressAdd);
