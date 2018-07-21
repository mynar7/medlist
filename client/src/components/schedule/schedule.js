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
    
    // function scheduleItem(scheditem){
    //     if (scheditem.length > 0 ){
    //         scheduleItem = scheditem.map(item =>{
    //             return(<div>{item.brandname}</div>)
    //         })

    //     }
    // }


    let sched;
    if (this.state.schedule.length > 0 ){ 
        sched = this.state.schedule.map(scheditem =>{
        return (<div><schedHeader className="schedHeader">{scheditem.time} </schedHeader><br />
        </div>)

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