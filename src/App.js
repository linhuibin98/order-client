import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import './App.less';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import routes from './routes';
import { validateToken } from './api';
import actions from './store/actions/userActions';

function App(props) {
  let { validate, isLogin, history } = props;
  
  useEffect(() => {
    (async () => {
      async function routrEachValidateToken() {
        let res = await validateToken();
        if (res.status === 200) {
          validate(res);
        }
      }
      await routrEachValidateToken();

      let unlisten = history.listen(async (location, action) => {
        // 路由拦截
        if (location.pathname === '/user/avatar' && action === 'POP') {
          history.push('/user');
        }
        await routrEachValidateToken();
      });
    })()
  }, []);

  // if (location.pathname === '/user/login' && isLogin) {
  //   history.push('/order');
  // }

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
                  state: { from: props.location.pathname }
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
      dispatch(actions.userValidate(data))
    }
  }
}

export default withRouter(connect(state => ({ ...state.user }), mapDispatchToProps)(App));
