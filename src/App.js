import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import checkLogin from './components/CheckLogin'
import { KeepAlive } from 'react-activation'
import routes from './routes'
import './App.less'

@checkLogin
class App extends Component {
  render() {
    return (
      <Switch>
        {routes.needCacheRoutes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route.path}
              render={props => (
                <KeepAlive
                  id={
                    props.match &&
                    props.match.params &&
                    (props.match.params.id || props.match.params.orderNum)
                  }
                  name={route.name}
                >
                  <route.component {...props} />
                </KeepAlive>
              )}
            />
          )
        })}
        {routes.defaultRoutes.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route.path}
              render={props => <route.component {...props} />}
            />
          )
        })}
      </Switch>
    )
  }
}

export default App
