import * as TYPES from '../action_types';
import { createAction } from 'redux-actions';
import { getShopDetail } from '../../api/index';
import { getStorage, setStorage }  from '../../util/storage';

const getShopData = createAction(TYPES.SHOP_GETDATA, async id => {
  let res = await getShopDetail(id);
  return res.data.data;
});

const setCartList = createAction(TYPES.SHOP_CARTLIST, payload => {
  let cartList = getStorage('cartList') || {};
  setStorage('cartList', {
    ...cartList,
    [payload.id]: payload.cartList
  });
  return payload.cartList;
});

export default {
  getShopData,
  setCartList
}