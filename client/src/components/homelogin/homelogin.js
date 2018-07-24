import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./homelogin.css";
import Background from "./hospital.jpg";

class Homelogin extends Component {

    render() {
        const style={backgroundImage: `url(${Background})`};
        return (
            <div className="column y-center homelogin">
            <div className="home-jumbotron" style={style}>
            <h1 className="home-jumbo-attn">Welcome</h1>

            </div>
            {
                this.props.isAuth ?
                <Link to="/medlistcontainer"><h1>dashboard</h1></Link> :
                <a className="" href="https://my-med-list.herokuapp.com/auth/google">
                    <h1>Login!</h1>
                </a>
            }
            </div>
        )
    }
}

export default withRouter(Homelogin);