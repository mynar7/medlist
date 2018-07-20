import React, { Component } from 'react';


class Meddetail extends Component {


    render() {
        
        return (
            <div className="meddetailitem">
            <h1 className="meddetailitemtitle">{this.props.title}</h1>
            <p className="meddetailitemtext">{this.props.text}</p>
            </div>
        )

        
    }
}

export default Meddetail;