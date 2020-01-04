import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import checkLogin from './components/CheckLogin';
import routes from './routes';
import './App.less';

class App extends Component {

  render() {
    return (
      <Switch>
        {
          routes.map((route, index) => {
            return (
              <Route exact key={index} path={route.path} render={props => 
                (<route.component {...props} />
              )} />
            )
          })
        }
      </Switch>
    );
  }
}

export default checkLogin(App);