import React, { Component } from "react";
import { Link } from "react-router-dom";
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className='app-header row y-center'>
                <span className="app-header-logo">My Meds</span>
                {
                    this.props.isAuth ?
                    <span>Welcome, {this.props.email}! 
                        <a href="http://localhost:3001/auth/logout">Logout?</a> 
                    </span> :
                    <a href="http://localhost:3001/auth/google">Login!</a>
                }
            </header>
        )
    }
}

export default Header;