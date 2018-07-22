import React from "react";
import './dosedetail.css';

const Dosedetail = props => {
    let timeArr = props.time.split(":");
    let hours = parseInt(timeArr[0]);
    let minutes = timeArr[1];
    let ampm;
    if(hours === 12) {
        ampm = 'pm';
    } else if(hours === 0) {
        hours = 12;
        ampm = 'am';
    } else if(hours > 12) {
        hours -= 12;
        ampm = 'pm';
    } else {
        ampm = 'am';
    }
    return (
    <div>
        <div className="row dose-detail-container">
            <div className="dose-detail">Dose: {props.dose}</div>
            <div className="dose-detail">Time: {`${hours}:${minutes} ${ampm}`}</div>
            <button onClick={props.delete}>Delete</button>
        </div>
        <div className="row dose-detail-container">
            <div className="dose-detail">Note: {props.note}</div>
        </div>
    </div>
    )
};

export default Dosedetail;