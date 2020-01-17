import React, { useRef } from "react";
import Toast from '../components/toast';
import { connect } from 'react-redux';
import actions from '../store/actions';
import formatSearch from '../util/formatSearch';
import { reqAddAddress } from '../api';
import { setStorage, getStorage } from '../util/storage';

function AddressAdd(props) {
  let { history, userInfo, addDre, location, match } = props;

  let linkRef = useRef(null);
  let phoneRef = useRef(null);
  let addressRef = useRef(null);
  let detailRef = useRef(null);

  function handleGoBack() {
    let redirect = formatSearch(location.search);

    redirect ? history.replace(redirect) : history.goBack();
  }

  async function handleConfirm() {
    let linkVal = linkRef.current.value;
    let phoneVal = phoneRef.current.value;
    let addVal = addressRef.current.value;
    let deVal = detailRef.current.value;

    if (!linkVal || !phoneVal || !addVal || !deVal) {
      return Toast.warning('不能为空, 必须填写...');
    }

    let id = userInfo.id;
    const address = {
      name: linkVal,
      phone: phoneVal,
      address: addVal + deVal
    }

    let result = await reqAddAddress({ id, address });

    if (result.status === 200 && result.data.errorCode === 0) {
      // 保存在redux中
      addDre(result.data.address);
      let addressLocal = getStorage('address') || {};
      addressLocal[id] = address;;
      Toast.success('添加成功...');
      setStorage('address', addressLocal);
      return handleGoBack();
    } else {
      return Toast.error('服务器正忙, 请稍后再试...')
    }
  }

  return (
    <div className="add_address">
      <header className="confim_head">
        <span onClick={handleGoBack}>
          <i className="iconfont icon-you-copy"></i>
        </span>
        <h1>{match.params.id ? '修改' : '添加'}地址</h1>
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

export default connect(state => ({ userInfo: state.user.userInfo }), mapDispatchToProps)(AddressAdd);
