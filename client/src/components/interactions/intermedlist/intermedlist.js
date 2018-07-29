import React, { Component } from 'react';
import $ from "axios";
import './intermedlist.css'

class Intermedlist extends Component {
    constructor() {
        super();
    
        this.state = { meds: []};
    }

    componentDidMount() {
        $.get('/api/allMeds')
        .then( res=> {
            if(this.unmounted) return;
            this.setState({meds: res.data});
        })
        .catch( error=> {
            this.props.history.push('/');
        });
    };

    componentWillUnmount(){
        this.unmounted = true;
    }
    
    render() {
        let meds;
        if (this.state.meds.length > 0 ){ 
            meds = this.state.meds.map(med =>{
            return (<li className="listitem" key={med.id}>{med.brand_name} </li>)
            })
        }
        
        return (
            <div><ul><h2 className="header">Your medications:</h2> {meds}</ul></div>
        )
    }
}

    export default Intermedlist;