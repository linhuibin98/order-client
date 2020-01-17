import { handleActions } from 'redux-actions';
import * as TYPES from '../action_types';

let initialState = {
  userInfo: {},
  isLogin: false,
  address: [],
}

const reducer = handleActions({
  [TYPES.USER_LOGIN]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload.userInfo,
      isLogin: action.payload.isLogin
    }
  },
  [TYPES.USER_VALIDATE]: (state, action) => {
    let { userInfo, isLogin} = action.payload
    return {
      ...state,
      userInfo,
      isLogin
    }
  },
  [TYPES.USER_GET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.payload
  }),
}, initialState);

export default reducer;