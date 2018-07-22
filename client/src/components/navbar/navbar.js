import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom'
import Bottle from "./bottle.png"
import Inter from "./inter.png"
import Cal from "./cal.png"

class Navbar extends Component {

    render() {

    return(
        <div className="footer">
        
        <Link to={"/medlistcontainer/"}><div className='navbutton'><img className="navpic" src={Bottle} alt="bottle" />Med List</div></Link>
        
        <Link to={"/interactionsview/"}><div className='navbutton'><img className="navpic" src={Inter} alt="Inter" />Interactions</div></Link>
        
        <Link to={"/scheduleview/"}><div className='navbutton'><img className="navpic" src={Cal} alt="Cal" />Schedule</div></Link>
            
        </div>
    )


    }
}
export default withRouter(Navbar);