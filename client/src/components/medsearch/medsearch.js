import React, { Component } from "react";
import $ from "axios";
import debounce from "lodash/debounce";
import MedResult from "./medresult";
import "./medsearch.css";

class MedSearch extends Component {
    
    state = {
        results: []
    }
    findMeds = debounce((e)=> {
        if(e.target.value !== "") {
            $.get(`/api/searchmed/${e.target.value}`)
            .then(res => {
                this.setState({results: res.data});
            })
            .catch(err => this.props.history.push('/'));
        }
    }, 500);

    addMed = medObj => {
        $.post('/api/addmed', medObj)
        .then(res => {
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="column y-center">
                {
                    this.state.results.length === 0 &&
                    <h1>Start Typing to Search for a med</h1>
                }
                <div className="row x-center med-search-bar">
                    <label htmlFor="med-search-bar">
                        <span>Search for a medication: </span>
                        <input type="text" 
                        id="med-search-bar" 
                        onChange={ 
                            e => {
                                e.persist();
                                this.findMeds(e);
                            }
                        }
                        />
                    </label>
                </div>
                <div className="column search-results">
                {
                    (this.state.results.length > 0) &&
                    this.state.results.map(x => (
                        <MedResult 
                        generic_name={x.generic_name}
                        brand_name={x.brand_name}
                        route={x.route}
                        key={x.openfda_id}
                        substances={
                            x.substance && x.substance.length > 1 ?
                            x.substance.join(", ") :
                            x.substance
                        }
                        addMed={() => {this.addMed(x)}}
                        />
                    ))
                }
                </div>

            </div>
        )
    }
}

export default MedSearch;
