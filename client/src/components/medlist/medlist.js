import React, {Component} from "react";
import { Link } from "react-router-dom";
import Meditem from './meditem';
import "./medlist.css";
class Medlist extends Component {

    render() {
        console.log(this.props.meds);
        let meds;
        if (this.props.meds.length > 0 ){ 
            meds = this.props.meds.map((med, index) =>{
            //console.log(med)
            return (<Meditem key={med.id} number={index} meditem={med} />)
            })
        }
        //console.log(this.props)
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            <div className = 'medlist column y-center' >
                <div className='medlistkey-row row y-center x-center'>
                    <div className="medlistkey-col column">
                        <div className="medlistkey"><b>Brand Name</b></div>
                        <div className="medlistkey">Generic Name</div> 
                    </div>
                    <div className="medlistkey row y-center">
                        <Link className="row y-center medlist-newmed-btn div-to-btn" to="/search">
                            <i className="fas fa-plus"></i>
                            <b>New Med</b>
                        </Link>
                    </div>
                </div>
                
                {meds}
                
            </div>
        )
    }
}

export default Medlist;