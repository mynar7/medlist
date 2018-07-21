import React, { Component } from "react";
import $ from 'axios';
import './doseform.css';

class Doseform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            ampm: "am",
            time: "",
            note: ""
        }
    }

    update = (e) => {
        this.setState({
            [e.target.getAttribute('name')]: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        let errors = [];
        let note;
        let time;
        let regex = /^(1[012]|[0-9]):[0-5][0-9]$/i;
        //ensure amount and time
        if(this.state.amount.length === 0) {
            errors.push("Please include dosage amount")
        }
        //ensure time matches format
        if(!regex.test(this.state.time)) {
            errors.push("Input time as follows \"9:00\" or \"10:15\"");
        } else {
            //parse time to 24h time
            let timeArr = this.state.time.split(":");
            let hours = parseInt(timeArr[0]);
            let leadingZero = "";
            if(this.state.ampm === "pm" && hours < 12) hours += 12;
            if(hours === 12 && this.state.ampm === "am") hours = 0;
            if(hours < 10) leadingZero = "0"
            time = leadingZero + hours.toString() + ':' + timeArr[1];
            console.log(time);
        }
        //set errors if there are any
        this.setState({
            error: errors
        });
        //check if note entered
        if(this.state.note.length > 0) {
            note = this.state.note;
        }
        if(errors.length === 0) {
            let data = {
                time: time,
                dose: this.state.amount,
                note: note
            }
            $.post(`/api/addDose/${this.props.medId}`, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="column y-center">
                {this.state.error && this.state.error.map((x, i) => <p key={i}>{x}</p>)}
                <form className="row x-center">
                    <label htmlFor="amount">
                        <span>Amount: </span>
                        <input type="text" 
                            value={this.state.amount} 
                            name="amount" 
                            onChange={this.update}/>
                    </label>
                    <label htmlFor="time" className="dose-form-time-label">
                        <span>Time: </span>
                        <input type="text" 
                            value={this.state.time}
                            name="time" 
                            pattern="([1-9]|1[0-2]):[0-5][0-9]"
                            onChange={this.update}/>:
                        <select value={this.state.ampm} name="ampm" onChange={this.update}>
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>
                    </label>
                    <label htmlFor="note">
                        <span>Note: </span>
                        <input type="text" value={this.state.note} name="note" onChange={this.update} />
                    </label>
                    <button type="submit" onClick={this.submit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Doseform;