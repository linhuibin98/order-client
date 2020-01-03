import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';
import { reqAddAddress } from '../../api';
import Toast from '../../components/toast';
import { setStorage, getStorage } from '../../util/storage';

const { userLogin, userValidate, userAddAddress, userGetAddress } = createActions({
  [TYPES.USER_LOGIN]: payload => payload,
  [TYPES.USER_VALIDATE]: payload => payload,
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
  [TYPES.USER_GET_ADDRESS]: payload => payload,
});
 
export default {
  userLogin,
  userValidate,
  userAddAddress,
  userGetAddress,
}