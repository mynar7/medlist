import React from "react";

const Dosedetail = props => (
    <div className="row">
        <div>{props.dose}</div>
        <div>{props.time}</div>
        <div>{props.note}</div>
    </div>
);

export default Dosedetail;