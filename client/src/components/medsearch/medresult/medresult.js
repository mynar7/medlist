import React from "react";
import './medresult.css';

const MedResult = props => (
    <div className="column y-center med-result-column">
        <h2 className="med-result-brand row x-center y-center">
            {props.brand_name}
            <button onClick={props.addMed}>Add to Med List</button>
        </h2>
        <h4>Generic name: {props.generic_name}</h4>
        <p>Ingredients: {props.substances}</p>
        <p>Route: {props.route}</p>   
        <hr/>      
    </div>
); 

export default MedResult;