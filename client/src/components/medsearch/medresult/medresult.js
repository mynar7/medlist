import React from "react";
import './medresult.css';

const MedResult = props => (
    <div className="column y-center med-result-column">
        <div className="med-result-brand row x-center y-center">
            <h2>{props.brand_name}</h2>
            <div className="div-to-btn" onClick={props.addMed}>Add to Med List</div>
        </div>
        <h4>Generic name: {props.generic_name}</h4>
        <p>Ingredients: {props.substances}</p>
        <p>Route: {props.route}</p>   
        <hr/>      
    </div>
); 

export default MedResult;