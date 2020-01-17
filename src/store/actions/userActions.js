import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';
import { reqGetAddress } from '../../api';

const { userLogin, userValidate, userGetAddress } = createActions({
  [TYPES.USER_LOGIN]: payload => payload,
  [TYPES.USER_VALIDATE]: payload => payload,
  [TYPES.USER_GET_ADDRESS]: async id => {
    const result = await reqGetAddress(id);

    if (result.status === 200 && result.data.errorCode === 0) {
      return result.data.address;
    }
  }
});

export default {
  userLogin,
  userValidate,
  userGetAddress,
}