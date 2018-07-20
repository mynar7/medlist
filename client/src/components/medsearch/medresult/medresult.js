import React from "react";

const MedResult = props => (
    <div className="row split med-result">
        <div>
            <p>Brand name: {props.brand_name}</p>
            <p>Generic name:{props.generic_name}</p>
            <p>Substances: {props.substances}</p>
            <p>Route: {props.route}</p>
        </div>
        <div>
            <button onClick={props.addMed}>Click to Add</button>
        </div>
    </div>
); 

export default MedResult;