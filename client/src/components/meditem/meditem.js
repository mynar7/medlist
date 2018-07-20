import React, { Component} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Mglass from "./mglass.png"
class Meditem extends Component {
    
    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            
                <tr className="meditem">   
                    <td><b>{this.props.meditem.brand_name}</b></td>  
                    <td>{this.props.meditem.generic_name}</td>
                    <td>
                        <Link to={`/meddetail/${this.props.meditem.id}/${this.props.meditem.openFDA_id}/${this.props.meditem.brand_name}`}>
                            <div  className='meddetailsbtn' data_drug={this.props.meditem.id}>
                            <img id="mglass" src={Mglass} alt="view" />more info/ dosages</div>
                        </Link>
                    </td>
                </tr>   
        )
    }
}

export default Meditem;