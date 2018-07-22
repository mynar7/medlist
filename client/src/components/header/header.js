import React, { Component } from "react";
import { Link } from "react-router-dom";
import './header.css';
import img from './pill2.png';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className='app-header row y-center'>
                <Link className="app-header-logo row y-center" to="/">
                <img className="app-header-logo-img" src={img}/>
                <h1>My Meds</h1>
                </Link>
                {
                    this.props.isAuth &&
                    <div className="row">
                        <span className="app-header-email">
                            Welcome, {this.props.email}! 
                        </span>
                        <a className="app-header-log" href="http://localhost:3001/auth/logout">Logout?</a>
                    </div>
                }
            </header>
        )
    }
}

export default Header;