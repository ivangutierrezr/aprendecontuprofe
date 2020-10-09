import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, HashRouter, Link
} from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import Usuario from './Usuario'
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
              <Route path="/admin" exact component={Admin} />
              <Route path="/home" exact component={Usuario} />
            </div>
          </HashRouter>
        }
      </Router>
    )
  }
}

export default App;
