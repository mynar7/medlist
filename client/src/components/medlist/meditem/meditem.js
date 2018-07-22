import React, { Component} from "react";
import { Link } from 'react-router-dom';
import "./meditem.css";
class Meditem extends Component {
    
    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            <div className="column meditem">
                <div className="meditem-row row y-center x-center">
                    <span className="meditem-number">#{this.props.number + 1}</span>
                    <div className="meditem-col">
                        <div>
                            <b>{this.props.meditem.brand_name}</b>
                        </div>  
                        <div>{this.props.meditem.generic_name}</div>
                    </div>
                    <div>
                        <Link to={`/meddetail/${this.props.meditem.id}/${this.props.meditem.openFDA_id}/${this.props.meditem.brand_name}`}>
                            <div  className='row x-center y-center div-to-btn meddetailsbtn' data_drug={this.props.meditem.id}>
                                <span>Info and doses</span>
                                <i className="fas fa-pills"></i>
                            </div>
                        </Link>
                    </div>
                </div>   
                <hr/>    
            </div>
        )
    }
}

export default Meditem;