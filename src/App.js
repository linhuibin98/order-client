import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.less';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import routes from './routes';
import { validateToken } from './api';
import actions from './store/actions/userActions';
import formatSearch from './util/formatSearch';
import { setStorage } from './util/storage';

function App(props) {
  let { validate, isLogin, history, location } = props;

  useEffect(() => {
    (async () => {
      async function routrEachValidateToken() {
        let res = await validateToken();
        if (res.data.errorCode === 0) {
          let { token, userInfo } = res.data;
          setStorage('token', token);
          validate({
            userInfo: userInfo,
            isLogin: true
          });
          return true;
        } else {// token失效, 清除基本信息
          validate({
            userInfo: {},
            isLogin: false
          })
          return false;
        }
      }
      await routrEachValidateToken();

      history.listen(async (location, action) => {
        // 路由拦截
        let isLogin = await routrEachValidateToken();
        let path = location.pathname;

        let params = formatSearch(location.search);
        let toPath = params['redirect'] || '/';

        if (path === '/user/login' && isLogin) {
          history.replace(toPath);
        }

        if (path === '/user/avatar' && action === 'POP') {
          history.push('/user');
        }
        
      });
    })()
  }, [history, validate]);

  return (
    <Switch>
      {
        routes.map((route, index) => {
          return (
            <Route exact key={index} path={route.path} render={props => (
              !route.auth
                ? <route.component {...props} />
                : (isLogin ? <route.component {...props} /> : <Redirect to={{
                  pathname: '/user/login',
                  search: `?redirect=${location.pathname}`
                }} />)
            )} />
          )
        })
      }
    </Switch>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    validate: (data) => {
      return dispatch(actions.userValidate(data));
    }
  }
}

export default withRouter(connect(state => ({ ...state.user }), mapDispatchToProps)(App));
