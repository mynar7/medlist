import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './components/home'
import Meddetail from './components/meddetail'

import './App.css';
import Header from './components/header'


class App extends Component {


  render() {
    return ( 
      <div className="App">
      <Header /> 
      <Router>
        <Switch>
          <Route path = "/" component={Home} exact />
          <Route path = "/meddetail/:medId" component={Meddetail} exact />
        </Switch>
      </Router>  

      </div>
    );
  }
}

export default App;
