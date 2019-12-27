import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxPromiseMiddleWare from 'redux-promise';

const middleWare = [reduxPromiseMiddleWare];

const store = createStore(reducer, applyMiddleware(...middleWare));

export default store;