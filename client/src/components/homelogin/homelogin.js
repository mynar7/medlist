import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Homelogin extends Component {

    render() {
        return (
            <div>
            {
                this.props.isAuth ?
                <Link to="/medlistcontainer"><h1>dashboard</h1></Link> :
                <a className="" href="http://localhost:3001/auth/google">
                    <h1>Login!</h1>
                </a>
            }
            </div>
        )
    }
}

export default withRouter(Homelogin);