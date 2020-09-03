import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, HashRouter, Link
} from 'react-router-dom'
import Login from './Login'
import './App.css';

class App extends Component {
  state = {}

  render() {
    return (
      <Router>
        {
          <HashRouter>
            <div className="content">
              <Route path="/" exact component={Login} />
            </div>
          </HashRouter>
        }
      </Router>
    )
  }
}

export default App;
