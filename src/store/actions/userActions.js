import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';

const { userLogin, userValidate, userAddAddress, userGetAddress } = createActions({
  [TYPES.USER_LOGIN]: payload => payload,
  [TYPES.USER_VALIDATE]: payload => payload,
  [TYPES.USER_ADD_ADDRESS]: payload => payload,
  [TYPES.USER_GET_ADDRESS]: payload => payload,
});
 
export default {
  userLogin,
  userValidate,
  userAddAddress,
  userGetAddress,
}