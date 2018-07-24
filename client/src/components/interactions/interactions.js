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
        .then( res=> {
            // let values = res.data.reduce((accumulator, interaction) =>{
                
            //     accumulator.i++;
            //     if(interaction.severity ==='high'){
            //         accumulator.r++;
            //     }
            //     else if (interaction.severity === "N/A"){
            //         accumulator.g++;
            //     }else{
            //         accumulator.y++;
            //     } 
            // }, { i:0 , g:0, y:0, r:0})
            this.setState({interactions: res.data});
             
             
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
            <div id="interactionmain">

                <h1 id="interactionsheader">Interactions</h1>
                <div className="row split">
                    <div className="explanation"><h2>Instructions:</h2>This is a list of potential interactions based on the list of meds you have provided.
                        These interactions do not consider dosages or other factors, but can serve as the basis for further
                        discussions with your health care providers.
                        {/* <div>{this.totali}</div> */}
                    </div>
                    {/* <Interactionlegend inter={this.state.interactions}/> */}
                    <Intermedlist />
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