import React, { Component } from 'react';
import $ from "axios";

class Interactions extends Component {


    componentDidMount() {
        $.get('/api/interactions')
        .then( res=> {
            // this.setState({meds: res.data});
            console.log (res)
        })
        .catch( error=> {
          throw (error);
        });
    }

    render() {
        return(
            <div>
                <h1>Interactions view</h1>
            </div>
        )

    }




}

export default Interactions;