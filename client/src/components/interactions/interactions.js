import React, { Component } from 'react';
import $ from "axios";
import './interactions.css'
import Intermedlist from './intermedlist'
// import Interactionlegend from './interactionlegend';
class Interactions extends Component {
    constructor() {
        super();
    
        this.state = { interactions: []}//,i:0,g:0,r:0,y:0};
    }

    componentDidMount() {
        $.get('/api/interactions')
        .then( res => {
            res.data.sort((a, b) => {if(b.severity === "high") return 1});
            let severeInteractions = res.data.filter(x => x.severity === "high");
            this.setState({
                interactions: res.data,
                severeInter: severeInteractions
            });
        })
        .catch( error=> {
          this.props.history.push('/');
        });
    }

    dotStyle = function(severity){
        if(severity ==="high"){
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
            
            let drugnames = inter.source.map((med, index) =>{
            return(<span key={index}> {med.minConceptItem.name}{index===0 && <i className="fas fa-exchange-alt"></i>} </span>)
            })
            return (<div className="interactionunit" key={index}><div className="tab row x-center y-center">{drugnames}</div><div className='interaction'><div style={this.dotStyle(inter.severity)}className="dot" >!</div>{inter.description} </div></div>)
            })
        }
        return(
            <div className="interactionmain column y-center">

                <h1 id="interactionsheader">Interactions</h1>
                <div className="row split interaction-jumbo">
                    <Intermedlist />
                    <div className="explanation"><h2>Instructions:</h2>This is a list of potential interactions based on the list of meds you have provided.
                        These interactions do not consider dosages or other factors, but can serve as the basis for further
                        discussions with your health care providers.
                        {/* <div>{this.totali}</div> */}
                    </div>
                    {/* <Interactionlegend inter={this.state.interactions}/> */}
                </div>
                {
                    this.state.severeInter && this.state.severeInter.length > 0 &&
                    <div className="column y-center text-center">
                        <h1 className="inter-warning">( {this.state.severeInter.length} ) Severe Interactions Detected</h1>
                        <p>If you are prescribed the medications causing this reaction, please be sure to discuss this combination with your doctor</p>
                    </div>
                }
                {
                    this.state.interactions.length > 0 ?
                        <div>
                            <h1 className="text-center">( {this.state.interactions.length} ) Total Interactions Detected</h1> 
                            {interactions} 
                        </div> :
                        <div className="column y-center">
                            <h1>No Interactions Found!</h1>
                        </div>
                }
                
            </div>
        )

    }




}

export default Interactions;