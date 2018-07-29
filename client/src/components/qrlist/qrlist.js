import React, { Component } from "react";
import $ from "axios";
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

    render() {
        return (
            <div className="column">
                {
                    this.state.meds.length > 0 &&
                    this.state.meds.map((x, i) => {
                        return (
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
                                            <div className="column qrlist-dose-col">
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
                        )
                    })
                }
            </div>
        )
    }
}

export default Qrlist;