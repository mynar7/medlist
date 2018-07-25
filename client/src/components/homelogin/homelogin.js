import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./homelogin.css";
import Background from "./hospital.jpg";

class Homelogin extends Component {

    render() {
        const style={backgroundImage: `url(${Background})`};
        return (
            <div className="column y-center homelogin">
                <div className="home-jumbotron column split" style={style}>
                    <h1 className="home-jumbo-attn home-jumbo-msg1">Manage your medications</h1>
                    <h1 className="home-jumbo-attn home-jumbo-msg2">Anytime</h1>
                    <h1 className="home-jumbo-attn home-jumbo-msg3">Anyplace</h1>
                </div>
                <div className="row x-center y-center home-welcome">
                    <h1>
                        Welcome to <span className="home-welcome-brand">My Meds</span>
                    </h1>
                </div>
                <div className="row x-center">
                <div className="home-main-row column y-center">
                    <h2 className="text-center">Manage and Understand Your Medications</h2>
                    <p>
                        <span className="home-welcome-brand">My Meds</span> is a medication management application for patients. 
                        It allows you to have access to your list of medications wherever you are.
                    </p>
                    <p>
                        My Meds also provides medication information and scheduling to help you 
                        better organize and stick to your treatment regimen, as well as to help
                        understand what your medications are for and how they interact with each other.
                    </p>
                </div>
                <div className="home-main-row column y-center">
                    <h1>Get Started:</h1>
                    {
                        this.props.isAuth ?
                        <div className="column y-center home-main-row-login">
                            <h4>You're logged in as: <span>{this.props.email}</span></h4>
                            <Link to="/medlistcontainer">
                                <p className="home-main-row-loglink"><u>Click Here to go to your Med List</u></p>
                            </Link> 
                            <p>
                                Or, you can click here to <a className="home-main-row-loglink" href="https://my-med-list.herokuapp.com/auth/google">
                                    <u>Logout</u>
                                    </a>
                            </p>
                        </div>
                        :
                        <div className="column y-center home-main-row-login">
                            <a href="https://my-med-list.herokuapp.com/auth/google">
                                <div className="home-main-row-loginbtn row y-center">
                                    <i className="fab fa-google"></i>
                                     Login with Google
                                </div>
                            </a>
                        </div>
                    }
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Homelogin);