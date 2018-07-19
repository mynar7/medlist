import React, { Component} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';

class Meditem extends Component {
    
    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            
                <tr className="meditem">   
                    <td><b>{this.props.meditem.brand_name}</b></td>  
                    <td>{this.props.meditem.generic_name}</td>
                    <td>
                        <Link to={`/meddetail/${this.props.meditem.id}`}>
                            <button type='button' className='meddetailsbtn' data_drug={this.props.meditem.id}>
                            more info/ dosages</button>
                        </Link>
                    </td>
                </tr>   
        )
    }
}

export default Meditem;