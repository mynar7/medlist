import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom'
import "./navbar.css"

class Navbar extends Component {

    render() {

    return(
        <div className="navbar row split">
        <div className="row split navbar-twobtn-grp">
        <Link to={"/medlistcontainer/"}>
            <div className='navbutton'>
                <i className="fas fa-prescription-bottle-alt"></i>
                <b>Med List</b>
            </div>
        </Link>
        <Link to="/search">
            <div className="navbutton">
                <i className="fas fa-plus"></i>
                <b>New Med</b>
            </div>
        </Link>
        </div>
        <div className="row split navbar-twobtn-grp">
        <Link to={"/interactionsview/"}>
            <div className='navbutton'>
                <i className="fas fa-sync-alt"></i>
                <b>Interactions</b>
            </div>
        </Link>
        
        <Link to={"/scheduleview/"}>
            <div className='navbutton'>
                <i className="far fa-clock"></i>
                <b>Schedule</b>
            </div>
        </Link>
        </div>        
        </div>
    )


    }
}
export default withRouter(Navbar);