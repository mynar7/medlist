import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom'
import "./navbar.css"

class Navbar extends Component {

    render() {

    return(
        <div className="navbar">
        
        <Link to={"/medlistcontainer/"}>
            <div className='navbutton'>
                <i className="fas fa-prescription-bottle-alt"></i>
                Med List
            </div>
        </Link>
        
        <Link to={"/interactionsview/"}>
            <div className='navbutton'>
                <i className="fas fa-sync-alt"></i>
                Interactions
            </div>
        </Link>
        
        <Link to={"/scheduleview/"}>
            <div className='navbutton'>
                <i className="far fa-clock"></i>
                Schedule
            </div>
        </Link>
            
        </div>
    )


    }
}
export default withRouter(Navbar);