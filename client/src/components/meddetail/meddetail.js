import React, { Component } from 'react';
import $ from "axios";
import Meddetailitem from '../meddetailitem'

class Meddetail extends Component {

    constructor() {
        super();
        this.state = { medInfo: []};
    }


componentDidMount(){
        $.get(`/api/medInfo/${this.props.match.params.FDAId}`)
        .then( res=> {
            this.setState({
                medInfo: Object.entries(res.data)
            });
        })
        .catch( error=> {
          console.log(error);
        });       
}

    render() {
        
        return (
            <div className="column y-center">
            <h1 className="meddetaildrugtitle">{this.props.match.params.brandname}</h1>

            <h1 className="meddetaildrugtitle">Drug Info:</h1>
            <div>
            {
                this.state.medInfo.length > 0 &&
                this.state.medInfo.map(x => {
                    return <Meddetailitem key={x[0]} title={x[0].replace(/_/gi, ' ')} text={x[1]} />
                })
            }
            </div>
            </div> 
        )

    }


}


export default Meddetail;