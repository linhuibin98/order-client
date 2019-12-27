import { handleActions } from 'redux-actions';
import * as TYPES from '../action_types';

let initialState = {
  userInfo: {},
  isLogin: false,
  address: [],
  orders: [],
  selectAddress: '',
  avatar: ''
}

const reducer = handleActions({
  [TYPES.USER_LOGIN]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload.userInfo,
      avatar: action.payload.avatar
    }
  },
  [TYPES.USER_VALIDATE]: (state, action) => {
    let { userInfo: { username, phone, id },  isLogin} = action.payload
    return {
      ...state,
      userInfo: {
        username,
        phone,
        id
      },
      isLogin
    }
  },
  [TYPES.USER_GET_ORDERS]: (state, action) => ({
    ...state,
    orders: action.payload
  }),
  [TYPES.USER_ADD_ADDRESS]: (state, action) => ({
    ...state,
    address: action.payload
  }),
  [TYPES.USER_GET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.payload
  }),
  [TYPES.USER_SELECT_ADDRESS]: (state, action) => ({
    ...state,
    selectAddress: action.payload
  }),
  [TYPES.USER_CHANGE_AVATAR]: (state, action) => ({
    ...state,
    avatar: action.payload
  })
}, initialState);

export default reducer;