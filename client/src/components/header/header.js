import React, { Component } from "react";
// import "./header.css";
import banner from './bannerpills.jpg'
class Header extends Component {


    render() {
        // Notice how each input has a `value`, `name`, and `onChange` prop
        return (
            <div className='Header'>   
                    <img src={banner} alt="logo" />
            </div>
        )
    }
}

export default Header;