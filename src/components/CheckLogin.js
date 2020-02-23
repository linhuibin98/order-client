import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { validateToken } from '../api';
import store from '../store';
import actions from '../store/actions';
import routes from '../routes';
import { setStorage } from '../util/storage';

export default function checkLogin(Target) {
  (async () => {
    let result = await validateToken();
    if (result.status === 200 && result.data.errorCode === 0) {
      let data = result.data;
      store.dispatch(actions.user.userValidate({
        userInfo: data.userInfo,
        isLogin: true
      }))
      setStorage('token', data.token);
    }
  }
  )()

  @withRouter
  @connect(state => ({ isLogin: state.user.isLogin }))
  class NewComponent extends Component {
    render() {
      let { location: { pathname, state } } = this.props.history;

      let isLogin = this.props.isLogin;
      let route = routes.all.find(route => route.path === pathname) || {}

      if (route.auth && !isLogin) {
        return <Redirect to={{
          pathname: '/user/login',
          state: {from: pathname}
        }} />
      }

      if (pathname === '/user/login' && isLogin) {
        return <Redirect to={{
          pathname: (state && state.from) || '/user'
        }} />
      }

      if (pathname === '/user/register' && isLogin) {
        return <Redirect to={{
          pathname: (state && state.from) || '/user'
        }} />
      }

      return <Target />
    }
  }
  return NewComponent;
}