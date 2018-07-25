import React from "react";
import './dosedetail.css';

const Dosedetail = props => {
    let timeArr = props.time.split(":");
    let hours = parseInt(timeArr[0]);
    let minutes = timeArr[1];
    let ampm;
    if(hours === 12) {
        ampm = 'PM';
    } else if(hours === 0) {
        hours = 12;
        ampm = 'AM';
    } else if(hours > 12) {
        hours -= 12;
        ampm = 'PM';
    } else {
        ampm = 'AM';
    }
    return (
    <div>
            <div className="row split dose-detail-container">
                <div className="dose-detail">Dose: {props.dose}</div>
                <div className="dose-detail">Time: {`${hours}:${minutes} ${ampm}`}</div>
                <div className="div-to-btn dose-detail-delete" onClick={props.delete}>Delete</div>
                <div className="dose-detail-note">
                    {props.note && <span>Note: {props.note}</span>}
                </div>
            </div>
        <hr/>
    </div>
    )
};

export default Dosedetail;