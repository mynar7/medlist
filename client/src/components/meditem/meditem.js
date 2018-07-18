import React, {
    Component
} from "react";

class Meditem extends Component {
    
    render() {
        console.log(this.props)
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            
                <tr className="meditem">   
                    <td><b>{this.props.meditem.brand_name}</b></td>  
                        <td>{this.props.meditem.generic_name}</td>
                        <td><button type='button' className='meddetailsbtn' data_drug={this.props.meditem.id}>more info/ dosages</button></td>
                </tr>   
        )
    }
}

export default Meditem;