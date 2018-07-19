import React, {Component} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom'
class Navbar extends Component {



    render() {

    return(
        <div className="footer">
        <Router>
        <Link to={"/">}<button type='button' className='navbutton'>Meds list</button></Link>
        </Router>
        <Router>
        <Link to={"/interactionsview/"}><button type='button' className='navbutton'>Interaction</button></Link>
        </Router>
        
            
        </div>
    )


    }
}
export default Navbar