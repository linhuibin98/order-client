import { combineReducers } from 'redux';
import user from './userReducer';
import shop from './shopReducer';

const reducer = combineReducers({
  user,
  shop
});

export default reducer;