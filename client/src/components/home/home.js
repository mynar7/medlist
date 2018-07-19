import React, { Component } from 'react';
import Medlist from '../medlist'
import $ from "axios";

class Home extends Component {
    constructor() {
        super();

        this.state = { meds: []};
    }


    componentDidMount() {
        $.get('/api/allMeds')
        .then( res=> {
            this.setState({meds: res.data});
            console.log (res)
        })
        .catch( error=> {
          throw (error);
        });
    //     this.callApi()
    //     .then(res => this.setState({ meds: res })
        
    //     )
    //     .catch(err => console.log(err));
    // }
  
    // callApi = async () => {
    //     const response = await fetch('/api/allMeds');
    //     const body = await response.json();
    
    //     if (response.status !== 200) throw Error(body.message);
    //     console.log(body)
    //     return body;
     };

    render() {
        
        return (
            <Medlist meds= {this.state.meds}/>
        )
    
    }
}


export default Home;