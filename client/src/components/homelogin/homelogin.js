import React, { Component } from "react";

class Homelogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            {
                this.props.isAuth ?
                <h1>dashboard</h1> :
                <h1>Login!</h1>
            }
            </div>
        )
    }
}

export default Homelogin;