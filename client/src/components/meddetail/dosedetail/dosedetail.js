import React from "react";
import './dosedetail.css';

const Dosedetail = props => (
    <div>
        <div className="row dose-detail-container">
            <div className="dose-detail">Dose: {props.dose}</div>
            <div className="dose-detail">Time: {props.time}</div>
            <button onClick={props.delete}>Delete</button>
        </div>
        <div className="row dose-detail-container">
            <div className="dose-detail">Note: {props.note}</div>
        </div>
    </div>
);

export default Dosedetail;