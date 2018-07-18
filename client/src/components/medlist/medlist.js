import React, {Component} from "react";
import Meditem from '../meditem'
class Medlist extends Component {

    render() {
        let meds;
        if (this.props.meds){
            meds = this.props.meds.map(med =>{
            //console.log(med)
            return (<Meditem key={med.id} meditem={med} />
                )
            })
        }
        //console.log(this.props)
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return ( 
            <div className = 'Medlist' >
            <table className='medtable'>
                <tbody>
                <tr className='medlistkeyrow'>
                    <th className="medlistkey">Brand Name</th>
                    <th className="medlistkey">Trade Name</th> 
                    <th className="medlistkey"><span id="newmedlabel">New Med  </span><button className='newmedbtn' >+</button></th>
                </tr>
                
                {meds}
                </tbody>
            </table>
            </div>
        )
    }
}

export default Medlist;