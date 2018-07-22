import React, { Component } from 'react';
import $ from "axios";

class Interactions extends Component {
    constructor() {
        super();
    
        this.state = { interactions: []};
    }

    componentDidMount() {
        $.get('/api/interactions')
        .then( res=> {
             this.setState({interactions: res.data});
            console.log (res.data)
        })
        .catch( error=> {
          this.props.history.push('/');
        });
    }

    render() {
        let interactions;
        if (this.state.interactions.length > 0 ){ 
            interactions = this.state.interactions.map(inter =>{
            //console.log(med)
            return (<div className='interaction'>{inter} </div>)
            })
        }
        return(
            <div id="interactionmain">

                <h1 id="interactionsheader">Interactions</h1>
                {interactions}
            </div>
        )

    }




}

export default Interactions;