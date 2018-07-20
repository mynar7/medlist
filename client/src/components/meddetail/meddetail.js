import React, { Component } from 'react';
import $ from "axios";
import Meddetailitem from '../meddetailitem'

class Meddetail extends Component {

    constructor() {
        super();

        this.state = { med: []};
    }


componentDidMount(){
        $.get(`/api/medInfo/${this.props.match.params.FDAId}`)
        .then( res=> {
            this.setState({med: res.data});
            console.log (res.data)
        })
        .catch( error=> {
          throw (error);
        });       
}

checkDescription(){
    if(this.state.med.description){
        return(<Meddetailitem title='Description' text={this.state.med.description} />)
    }   
}

checkIndicationsAndUsage(){
    if(this.state.med.indications_and_usage){
        return(<Meddetailitem title='Indications and usage' text={this.state.med.indications_and_usage} />)
    }   
}

checkBoxedWarning(){
    if(this.state.med.boxed_warning){
        return(<Meddetailitem title='Boxed Warning' text={this.state.med.boxed_warning} />)
    }
}

checkWarningsAndCautions(){
    if(this.state.med.warnings_and_cautions){
        return(<Meddetailitem title='Warnings and Cautions' text={this.state.med.warnings_and_cautions} />)
    }
}


    render() {
        
        return (
            <div>
            <h1 className="meddetaildrugtitle">{this.props.match.params.brandname}</h1>


            {/* <Meddetailitem title='Description' text={this.state.med.description} /> */}
            {this.checkDescription()}
            {/* <Meddetailitem title='Indications and usage' text={this.state.med.indications_and_usage} /> */}
            {this.checkIndicationsAndUsage()}
            {/* <Meddetailitem title='Boxed Warning' text={this.state.med.boxed_warning} /> */}
            {this.checkBoxedWarning()}
            {/* <Meddetailitem title='Warning and Cautions' text={this.state.med.warnings_and_cautions} /> */}
            {this.checkWarningsAndCautions()}
            </div> 
        )

    }


}


export default Meddetail;