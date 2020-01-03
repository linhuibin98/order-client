import { combineReducers } from 'redux';
import user from './userReducer';

const reducer = combineReducers({
  user
});

export default reducer;