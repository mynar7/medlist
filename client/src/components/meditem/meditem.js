import React, { Component} from "react";
import { Link } from 'react-router-dom';
import "./meditem.css";
class Meditem extends Component {
    
    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            
                <tr className="meditem">   
                    <td><b>{this.props.meditem.brand_name}</b></td>  
                    <td>{this.props.meditem.generic_name}</td>
                    <td>
                        <Link to={`/meddetail/${this.props.meditem.id}/${this.props.meditem.openFDA_id}/${this.props.meditem.brand_name}`}>
                            <div  className='row x-center y-center div-to-btn meddetailsbtn' data_drug={this.props.meditem.id}>
                                <span>Info and doses</span>
                                <i class="fas fa-pills"></i>
                            </div>
                        </Link>
                    </td>
                </tr>   
        )
    }
}

export default Meditem;