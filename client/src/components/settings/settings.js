import React, { Component } from "react";
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
            
                <div className="column">
                    <h1>Settings</h1>
                </div>

                <div className="column y-center">
                    <h2 className="settings-label">QR Code</h2>
                    <div className="row split">
                        <div className="settings-col"></div>
                        <div className="settings-col column y-center">
                        <p>Click to Download your list QR Code</p>
                        <a href="/api/qrcode" download="QRcode.png">
                            {this.makeQR()}
                        </a>
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
}


export default Settings;