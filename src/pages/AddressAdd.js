import React, { useRef, useEffect, useState } from "react";
import Toast from '../components/toast';
import { connect } from 'react-redux';
import formatSearch from '../util/formatSearch';
import { reqAddAddress, reqUpdateAddress, reqGetTargetAddress } from '../api';
import { setStorage, getStorage } from '../util/storage';

function AddressAdd(props) {
  let { history, userInfo, location, match } = props;

  let linkRef = useRef(null);
  let phoneRef = useRef(null);
  let addressRef = useRef(null);
  let detailRef = useRef(null);
  let [targetAddress, setTargetAddress] = useState({});

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
      address: addVal,
      detail: deVal
    }

    let result;

    if (match.params.id) {
      result = await reqUpdateAddress(match.params.id, address);
    } else {
      result = await reqAddAddress({ id, address });
    }

    if (result.status === 200 && result.data.errorCode === 0) {
      // 更新本地address数据
      let addressLocal = getStorage('address') || {};
      addressLocal[id] = address;
      Toast.success(result.data.message);
      setStorage('address', addressLocal);
      return handleGoBack();
    } else {
      return Toast.error('服务器正忙, 请稍后再试...')
    }
  }

  useEffect(() => {
    if(match.params.id) {
      reqGetTargetAddress(match.params.id).then(result => {
        setTargetAddress(result.data.data)
      }).catch(err => {
        Toast.error(err.message);
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <input ref={linkRef} type="text" placeholder="姓名" defaultValue={targetAddress.name} />
          </div>
          <div className="linkman">
            <span>电话</span>
            <input ref={phoneRef} type="text" placeholder="手机号码" defaultValue={targetAddress.phone} />
          </div>
          <div className="linkman">
            <span>地址</span>
            <input ref={addressRef} type="text" placeholder="小区/写字楼/学校" defaultValue={targetAddress.address} />
          </div>
          <div className="linkman">
            <span>详细</span>
            <input ref={detailRef} type="text" placeholder="门牌号" defaultValue={targetAddress.detail} />
          </div>
        </div>
        <div className='form_btn'>
          <button className='btn' onClick={handleConfirm}>确定</button>
        </div>
      </main>
    </div>
  );
}

export default connect(({user}) => ({ userInfo: user.userInfo }))(AddressAdd);
