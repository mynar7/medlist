import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Medlist from './components/medlist'

class App extends Component {
  constructor() {
    super();
    this.state = {meds: []};
}


componentDidMount() {
  this.callApi()
    .then(res => this.setState({ meds: res })
  
  )
    .catch(err => console.log(err));
}

callApi = async () => {
  const response = await fetch('/api/allMeds');
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);
  console.log(body)
  return body;
};
componentWillMount(){

//hard coded solution
//   this.setState({meds:[{
//     brand_name: 'Hydro',
//     generic_name: 'Hydrochlorothiazide',
//     id: 1
//     },{
//     brand_name: 'Aspirin',
//     generic_name: 'Bayer',
//     id: 2
//     }]
// })
}





  render() {
    return ( 
      <div className="App">
      <Header /> 

      <Medlist meds= {this.state.meds}/>

      </div>
    );
  }
}

export default App;
