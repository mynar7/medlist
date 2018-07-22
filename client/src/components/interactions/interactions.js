import React, { Component } from 'react';
import $ from "axios";
import styles from './interactions.css'

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

    dotStyle = function(severity){
        if(severity ==='high'){
            return({backgroundColor: 'red', color: 'white'})
        }
        else if (severity === "N/A"){
            return({backgroundColor: 'green', color: 'white'})
        }else{
            return({backgroundColor: 'yellow', color: 'black'})
        }
    }

    render() {
        let interactions;
        if (this.state.interactions.length > 0 ){ 
            interactions = this.state.interactions.map(inter =>{
            //console.log(med)
            return (<div><div className='interaction'><div style={this.dotStyle(inter.severity)}className="dot" >!</div>{inter.description} </div></div>)
            })
        }
        return(
            <div id="interactionmain">

                <h1 id="interactionsheader">Interactions</h1>
                <div className="explanation">This is a list of potential interactions based on the list of meds you have provided.
                    These interactions do not consider dosages or other factors, but can serve as the basis for further
                    discussions with your health care providers
                </div>
                {interactions}
                <div className="disclaimer"><b>Disclaimer:</b> It is not our intention to provide 
                specific medical advice, but rather to provide users with 
                information to better understand their health and their medications. 
                We urge you to consult with a qualified physician for advice about 
                medications.</div>
            </div>
        )

    }




}

export default Interactions;