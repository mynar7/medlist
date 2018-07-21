import React, {Component} from "react";
import $ from 'axios';

class Schedule extends Component {

    constructor() {
        super();
    
        this.state = { schedule: []};
    }

    componentDidMount(){
        $.get("/api/schedule/")
        .then( res=> {
            this.setState({schedule: res.data});
            console.log (res.data)
        })
        .catch( error=> {
          throw (error);
        });       
    }



render() {
    let sched;
    if (this.state.schedule.length > 0 ){ 
        sched = this.state.schedule.map(scheditem =>{
        
        return (<schedHeader className="schedHeader">{scheditem.time} </schedHeader>)
        })
    }
    return(
    <div>
        <h1>Dosages</h1>
        {sched}


    </div>
    )

}




}

export default Schedule;