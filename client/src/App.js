import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter, Switch} from 'react-router-dom';
import $ from "axios";
import Medlistcontainer from './components/medlistcontainer'
import Meddetail from './components/meddetail';
import Interactions from './components/interactions';
import Navbar from './components/navbar';
import MedSearch from './components/medsearch';
import Schedule from './components/schedule';
import Homelogin from './components/homelogin';

import './App.css';
import Header from './components/header'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    }
  }

  componentWillMount() {
      this.testAuth();
  }

  testAuth = () => {
    $.get('/api/test')
    .then(res => {
      console.log(res.data);
      this.setState({ 
        isAuth: true,
        email:  res.data.email
      })
    })
    .catch(err => this.setState({
        isAuth: false
    }))
  }

  login = () => {
    $.get("/auth/google")
    .then(res => this.testAuth())
    .catch(err => console.log(err));
  }

  logout = () => {
    $.get("/auth/logout")
    .then(res => this.props.history.push('/'))
    .catch(err => console.log(err));
  }

  render() {
    console.log("render");
    console.log(this.state.isAuth);
    return ( 
      <div className="App">
      <Header isAuth={this.state.isAuth} 
        email={this.state.email} 
        logout={this.logout}
        login={this.login}/> 
        {this.state.isAuth &&
        <Navbar />} 
        <Switch>
          <Route path = "/" render={(props) => <Homelogin {...props} isAuth={this.state.isAuth} />} exact />
          <Route path = "/medlistcontainer" component={Medlistcontainer} exact />
          <Route path = "/meddetail/:medId/:FDAId/:brandname" component={Meddetail} exact />
          <Route path = "/interactionsview" component={Interactions} exact />
          <Route path = "/scheduleview" component={Schedule} exact />
          <Route path = "/search" component={MedSearch} exact />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
