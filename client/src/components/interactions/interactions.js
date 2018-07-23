import React, { Component } from 'react';
import $ from "axios";
import './interactions.css'
import Intermedlist from './intermedlist'
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
            interactions = this.state.interactions.map((inter, index) =>{
            //console.log(med)
            let medString = "| "
            let drugnames = inter.source.map(med =>{
                medString += med.minConceptItem.name + " | "
            })
            return (<div className="interactionunit" key={index}><div className="tab">{medString}</div><div className='interaction'><div style={this.dotStyle(inter.severity)}className="dot" >!</div>{inter.description} </div></div>)
            })
        }
        return(
            <div id="interactionmain">

                <h1 id="interactionsheader">Interactions</h1>
                <div className="container">
                    <div className="explanation"><h2>Instructions:</h2>This is a list of potential interactions based on the list of meds you have provided.
                        These interactions do not consider dosages or other factors, but can serve as the basis for further
                        discussions with your health care providers.
                    </div>
                    <Intermedlist />
                </div>
                {interactions}
                
            </div>
        )

    }




}

export default Interactions;