import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';
import { reqAddAddress, reqGetAddress } from '../../api';
import Toast from '../../components/toast';
import { setStorage, getStorage } from '../../util/storage';

const { userLogin, userValidate, userGetOrders, userAddAddress, userGetAddress, userSelectAddress, userChangeAvatar } = createActions({
  [TYPES.USER_LOGIN]: payload => payload,
  [TYPES.USER_VALIDATE]: payload => payload,
  [TYPES.USER_GET_ORDERS]: payload => payload,
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