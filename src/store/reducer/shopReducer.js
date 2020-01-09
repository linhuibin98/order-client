import { handleActions } from 'redux-actions';
import * as TYPES from '../action_types';

let initialState = {
  cartList: []
}

const reducer = handleActions({
  [TYPES.SHOP_CARTLIST]: (state, action) => {
    return {
      ...state,
      userInfo: action.payload,
    }
  },
}, initialState);

export default reducer;