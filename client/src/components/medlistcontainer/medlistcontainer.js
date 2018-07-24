import React, { Component } from 'react';
import Medlist from '../medlist'
import $ from "axios";

class Medlistcontainer extends Component {
    constructor() {
        super();
        this.state = { meds: []};
    }

    componentDidMount() {
        $.get('/api/allMeds')
        .then( res=> {
            this.setState({meds: res.data});
        })
        .catch( error=> {
            this.props.history.push('/');
        });
     };

    render() {
        
        return (
            <Medlist meds= {this.state.meds}/>
        )
    
    }
}


export default Medlistcontainer;