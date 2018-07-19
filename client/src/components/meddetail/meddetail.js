import React, { Component } from 'react';


class Meddetail extends Component {

componentDidMount(){
    
}
    render() {
        
        return (
            <h1> This contains detailed info on the specific med {this.props.match.params.medId}</h1>
        )

    }


}


export default Meddetail;