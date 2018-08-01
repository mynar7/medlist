import React, { Component } from "react";
import $ from "axios";
import { QRCode } from 'react-qr-svg';
import './qrlist.css';

class Qrlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meds: []
        }
    }
    componentDidMount() {
        $.get(`/api/open/list/${this.props.match.params.userId}`)
            .then(res => {
                this.setState({meds: res.data});
            })
            .catch(err => console.log(err))
    }

    makeQR = () => {
        return <QRCode value={`http://my-med-list.herokuapp.com/open/list/${this.props.match.params.userId}`} style={{width: "128px"}} />
    }

    render() {
        return (
            <div className="column y-center">
                <h1 className="text-center">This List's QR Code:</h1>
                <span>{this.makeQR()}</span>
                {
                    this.state.meds.length > 0 &&
                    this.state.meds.map((x, i) => {
                        return (
                            <div className="column qrlist-item" key={x.id}>
                                <div className="row x-center qr-list-row">
                                    <div className="column qrlist-col">
                                        <div className="row qrlist-names">
                                            <span>
                                                <b>#{i + 1}) {x.brand_name}</b> ({x.generic_name})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="column qrlist-col">
                                    {
                                        x.dose_times.map(x => {
                                            return (
                                                <div className="column qrlist-dose-col" key={x.id}>
                                                    <div className="row qrlist-dose">
                                                        <span>&bull; {x.dose} @ {x.time}</span>
                                                    </div>
                                                    {
                                                        x.note && 
                                                        <div className="row qrlist-note">
                                                            <span>{x.note}</span>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Qrlist;