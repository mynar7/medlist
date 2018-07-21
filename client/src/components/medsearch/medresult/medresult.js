import React from "react";
import './medresult.css';

const MedResult = props => (
    <div className="column x-center">
        <h2 className="med-result-brand">{props.brand_name}</h2>
        <div className="row med-result">
            <div className="med-result-column">
                <p>Generic name</p>
                <p>{props.generic_name}</p>
                <p>Substances</p> 
                <p>{props.substances}</p>
                
            </div>
            <div className="med-result-column">
                <p>Route</p> 
                <p>{props.route}</p> 
                <button onClick={props.addMed}>Add Med +</button>
            </div>
        </div>
    </div>
); 

export default MedResult;