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
            if(this.unmounted) return;
            this.setState({schedule: res.data});
        })
        .catch( error=> {
            this.props.history.push('/');
        });       
    }

    componentWillUnmount(){
        this.unmounted = true;
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
        } else if (hour == 12) {
            newhour = 12
            designator = 'PM'
        } else if (hour > 12) {
            newhour = hour -12
            designator = 'PM'
        } else {
                newhour = hour
                designator = 'AM'
            }
        return (newhour + ':' + minute + ' ' + designator)
    }

    


    render() {
        
        let sched;
        if (this.state.schedule.length > 0 ){ 
        sched = this.state.schedule.map((scheditem, schedIndex) =>{
                let dose;
                dose = scheditem.meds.map((doseitem, doseIndex)=>{
                return(<div className="doseitem row" key={doseIndex}>
                        <span>
                        ● {doseitem.med.brand_name} - {doseitem.dose} 
                        </span>
                        <span>
                            {this.checkfornotes(doseitem.note)}
                        </span>
                    </div>)
                } )

            return  (<div className="column" key={schedIndex}> 
                        <div className="row timeheader">
                            <span className="timeheader-time">
                                {this.checkAMPM(scheditem.time)}
                            </span>
                        </div>
                        {dose}
                    </div>)
            })
        }


        return(
        <div className="column y-center">
            <div className="schedule">
                <h1 className="scheduleheader">Dosage Schedule</h1>
                {sched}
            </div>
        </div>
        )

    }

}

export default Schedule;