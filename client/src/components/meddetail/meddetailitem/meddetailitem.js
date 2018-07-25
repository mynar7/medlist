import React, { Component } from 'react';
import "./meddetailitem.css";


class Meddetail extends Component {
    constructor(props) {
        super(props);
        let text = this.props.text[0].replace(/•/gi, '|');
        let textArr;
        if(text.includes('|')) {
            textArr = text.split('|');
        }
        this.state = {
            text: text,
            textArr: textArr
        }
    }

    render() {
        
        return (
            <div className="meddetailitem">
            <h1 className="meddetailitemtitle">{this.props.title}</h1>
            <div>
                {
                    this.state.textArr ?
                        this.state.textArr.map((x, index) => <p className="meddetailitemtext" key={index}>{x}</p>) :
                        <p className="meddetailitemtext">{this.state.text}</p>
                }
            </div>
            </div>
        )

        
    }
}

export default Meddetail;