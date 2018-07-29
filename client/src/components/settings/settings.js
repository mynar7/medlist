import React, { Component } from "react";
import { Link } from "react-router-dom";
import { QRCode } from 'react-qr-svg';
import "./settings.css"


class Settings extends Component {
    constructor(props) {
        super(props);
        if(!props.isAuth) {
            props.history.push('/');
        }
    }

    makeQR = () => {
        return <QRCode value={`http://my-med-list.herokuapp.com/open/${this.props.userId}`} style={{width: "128px"}} />
    }

    render() {
        return (
            <div className="column y-center">
            
                <div className="column y-center">
                    <h1>Settings</h1>
                    <Link to="/medlistcontainer" className="row y-center">
                    <i className="fas fa-arrow-left"></i>Return to your Med List 
                    </Link>
                </div>

                <div className="column y-center">
                    <h2 className="settings-label">QR Code</h2>
                    <div className="row split">
                        <div className="settings-col"></div>
                        <div className="settings-col column y-center">
                            <p>Click to Download your list QR Code</p>
                            {this.makeQR()}
                            <div className="row x-center y-center settings-dl-btns">
                                <a href="/api/qrcode/png" download="QRcode.png">
                                    <div className="div-to-btn">Save as PNG</div>
                                </a>
                                <a href="/api/qrcode/svg" download="QRcode.svg">
                                    <div className="div-to-btn">Save as SVG</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
}


export default Settings;