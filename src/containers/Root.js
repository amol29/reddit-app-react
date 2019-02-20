import '../App.css';
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import configureStore from '../configureStore'
import AsyncApp from './SubredditApp'
import Home from './Home'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <div className={'center-box'}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/:filter" component={AsyncApp}/>
              </Switch>
            </div>
          </Router>
          {/*<AsyncApp />*/}
        </Provider>
    )
  }
}