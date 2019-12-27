import { handleActions } from 'redux-actions';
import * as TYPES from '../action_types';

const initialState = {
  shopData: {},
  cartList: []
}

const reducer = handleActions({
  [TYPES.SHOP_GETDATA]: (state, action) => ({
    ...state,
    shopData: action.payload
  }),
  [TYPES.SHOP_CARTLIST]: (state, action) => ({
    ...state,
    cartList: action.payload
  })
}, initialState);

export default reducer;