import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './components/home';
import Meddetail from './components/meddetail';
import Interactions from './components/interactions';
import Navbar from './components/navbar';
import MedSearch from './components/medsearch';

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
          <Route path = "/interactionsview" component={Interactions} exact />
          <Route path = "/search" component={MedSearch} exact />
        </Switch>
      </Router>  
      <Navbar />
      </div>
    );
  }
}

export default App;
