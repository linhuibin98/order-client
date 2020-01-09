import * as TYPES from '../action_types';
import { createActions } from 'redux-actions';

const { shopCartlist } = createActions({
  [TYPES.SHOP_CARTLIST]: payload => payload,
});
 
export default {
  shopCartlist
}