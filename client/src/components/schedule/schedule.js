import React, {Component} from "react";
import $ from 'axios';
import './schedule.css'

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
            this.props.history.push('/');
        });       
    }

    checkfornotes = function(value){
    if (value) {
      return ( '(' + value + ')' )
    }
    return (null);
  }

  checkAMPM = function(value){
       let cut= (value.indexOf(":"));
       let hour = value.slice(0,cut);
       let minute = value.slice(cut+1,value.length)
       let newhour;
       let designator
       if (hour == 0) {
        newhour = 12
        designator = 'AM'
       } else if (hour == 12){
           newhour = 12
           designator = 'PM'
       } else if (hour > 12){
           newhour = hour -12
           designator = 'PM'
       }else{
            newhour = hour
            designator = 'AM'
        }
        return (newhour + ':' + minute + ' ' + designator)
       }

    


render() {
    
    let sched;
    if (this.state.schedule.length > 0 ){ 
        sched = this.state.schedule.map(scheditem =>{
            let dose;
            dose = scheditem.meds.map(doseitem=>{
            return(<div className="doseitem">{doseitem.med.brand_name} {doseitem.dose} {this.checkfornotes(doseitem.note)}</div>)
            } )

        return (<div> <div className="timeheader">{this.checkAMPM(scheditem.time)} </div><br />
        {dose}
        </div>)

        })
    }


    return(
    <div>
        <h1 className="scheduleheader">Schedule of dosages</h1>
        {sched}


    </div>
    )

}




}

export default Schedule;