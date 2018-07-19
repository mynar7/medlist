import React, { Component } from 'react';
import $ from "axios";

class Meddetail extends Component {

    constructor() {
        super();

        this.state = { med: []};
    }


componentDidMount(){
    $.get(`/api/med/${this.props.match.params.medId}`)
    .then( res=> {
        //this.setState({med: res.data});
        console.log (res.data.generic_name)
        $.get(`/api/informed/${res.data.openFDA_id}`)
        .then( res2=> {
        
    
            this.setState({med: res2.data});
            console.log (res2.data)
            
        })
        .catch( error=> {
          throw (error);
        });       
    })
    .catch( error=> {
      throw (error);
    });
}
    render() {
        
        return (
            <h1> This contains detailed info on the specific med {this.props.match.params.medId}</h1>
        )

    }


}


export default Meddetail;