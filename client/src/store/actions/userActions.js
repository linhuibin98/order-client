import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';
import { requestUserLogin, requestGetOrders, reqAddAddress, reqGetAddress } from '../../api';
import Toast from '../../components/toast';
import { setStorage, getStorage } from '../../util/storage';

const { userLogin, userValidate, userGetOrders, userAddAddress, userGetAddress, userSelectAddress, userChangeAvatar } = createActions({
  [TYPES.USER_LOGIN]: async payload => {
    let { username, password, history, from } = payload;
    let res = await requestUserLogin({
        username,
        password
      });
      // 登录成功
    if (res.status === 200 && res.data.errorCode === 0) {
      let data = res.data;
      Toast.success(data.message);
      // 更新token
      setStorage('token', data.token);
      history.push(from);
      // userInfo、avatar信息存放在redux中
      return {
        userInfo: data.userInfo,
        avatar: data.avatar
      };
    } else {
      Toast.success(res.data.message);
      return {};
    }
  },
  [TYPES.USER_VALIDATE]: res => {
    // token校验成功, 更新token,并保存基本信息
    if (res.data.errorCode === 0) {
      setStorage('token', res.data.token);
      return {
        userInfo: res.data.userInfo,
        isLogin: true
      };
    } else {// token失效, 清除基本信息
      return {
        userInfo: {},
        isLogin: false
      };
    }
  },
  [TYPES.USER_GET_ORDERS]: async id => {
    let res = await requestGetOrders(id);
    if (res.status === 200 && res.data.errorCode === 0) {
      return res.data.orders;
    } else {
      return [];
    }
  },
  [TYPES.USER_ADD_ADDRESS]: async data => {
    let { id, address, history, from } = data;
    let res = await reqAddAddress({id, address});

    let addressLocal = getStorage('address') || {};
    addressLocal[id] = address;

    if (res.status === 200 && res.data.errorCode === 0) {
      history.replace(from);
      Toast.success('添加成功...');
      setStorage('address', addressLocal);
      return res.data.address;
    }
    return [];
  },
  [TYPES.USER_GET_ADDRESS]: async id => {
    let res = await reqGetAddress(id);

    if (res.status === 200 && res.data.errorCode === 0) {
      return res.data.address
    }
    return [];
  },
  [TYPES.USER_SELECT_ADDRESS]: val => {
    let { userId, CurrentAddress } = val;
    let address = getStorage('address') || {};
    address[userId] = CurrentAddress;
    setStorage('address', address);
    return val;
  },
  [TYPES.USER_CHANGE_AVATAR]: payload => {
    return payload;
  }
});

export default {
  userLogin,
  userValidate,
  userGetOrders,
  userAddAddress,
  userGetAddress,
  userSelectAddress,
  userChangeAvatar
}