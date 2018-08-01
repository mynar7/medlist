import React, { Component } from "react";
import { Link } from "react-router-dom";
import './header.css';
import img from './pill.png';

class Header extends Component {

    render() {
        return (
            <header className='app-header row y-center x-center'>
                <Link className="app-header-logo row y-center" to="/">
                <img className="app-header-logo-img" src={img} alt="logo"/>
                <h1>My Meds</h1>
                </Link>
                {
                    this.props.isAuth &&
                    <div className="column x-center y-center">
                        <span className="app-header-email">
                            Welcome, {this.props.email}! 
                        </span>
                        <div className="row split">
                        <Link to="/settings" className="app-header-settings text-center">
                            <i className="fas fa-cog"></i><span className="setting-text">Settings</span>
                        </Link>
                
                        <a className="app-header-log" href="https://my-med-list.herokuapp.com/auth/logout">
                            <i className="fas fa-sign-out-alt"></i>Logout
                        </a>
                        </div>
                    </div>
                }
            </header>
        )
    }
}

export default Header;