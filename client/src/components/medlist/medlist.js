import React, {Component} from "react";
import { Link } from "react-router-dom";
import Meditem from './meditem';
import "./medlist.css";
class Medlist extends Component {

    render() {
        let meds;
        if (this.props.meds.length > 0 ){ 
            
        }
        //console.log(this.props)
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            <div className = 'medlist column y-center' >
                {
                    this.props.meds.length > 0 ?
                    meds = this.props.meds.map((med, index) => (
                         <Meditem key={med.id} number={index} meditem={med} />
                        )) :
                        <div className="column y-center">
                            <h1>Welcome to your med list!</h1>
                            <p>Click "New Med" to search for a medication to add to your list.</p>
                        </div>

                }
            </div>
        )
    }
}

export default Medlist;