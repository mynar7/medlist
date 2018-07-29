import React, { Component } from 'react';
import $ from "axios";
import Meddetailitem from './meddetailitem';
import Doseform from './doseform';
import Dosedetail from './dosedetail';
import "./meddetail.css";

class Meddetail extends Component {

    constructor() {
        super();
        this.state = { 
            medInfo: [],
            deleteDialog: false
        };
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        $.get(`/api/doses/${this.props.match.params.medId}`)
            .then(res => {
                if(this.unmounted) return;
                this.setState({
                    doses: res.data
                })
            })
            .catch(err => this.props.history.push('/'));


        $.get(`/api/medInfo/${this.props.match.params.FDAId}`)
            .then( res=> {
                if(this.unmounted) return;
                this.setState({
                    medInfo: Object.entries(res.data)
                });
            })
            .catch( error=> {
            console.log(error);
            });       
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    updateDoses = () => {
        $.get(`/api/doses/${this.props.match.params.medId}`)
            .then(res => {
                this.setState({
                    doses: res.data
                })
            })
            .catch(err => this.props.history.push('/'));
    }

    deleteDose = doseId => {
        $.delete(`/api/dose/${doseId}`)
        .then(res => this.updateDoses())
        .catch(err => console.log(err));
    }

    deleteMed = medId => {
        $.delete(`/api/med/${medId}`)
        .then(res => this.props.history.push('/medlistcontainer'))
        .catch(err => console.log(err));
    }

    toggleDeleteDialog = () => {
        if(this.state.deleteDialog) {
            this.setState({ deleteDialog: false });
        } else {
            this.setState({ deleteDialog: true });
        }
    }

    render() {
        
        return (

            <div className="column y-center">
                <div className="row x-center y-center meddetail-header">
                    <h1 className="meddetaildrugtitle">{this.props.match.params.brandname}</h1>
                    {
                        !this.state.deleteDialog && 
                        <div className="div-to-btn" onClick={this.toggleDeleteDialog}>Delete</div>
                    }
                </div>
                {
                    this.state.deleteDialog && 
                    <div className="row x-center">
                        Remove this drug from your list?
                        <span className="div-to-btn" onClick={() => this.deleteMed(this.props.match.params.medId)}>
                            Remove from List
                        </span> 
                        <span className="div-to-btn" onClick={this.toggleDeleteDialog}>
                            Cancel
                        </span>
                    </div>
                }
                <div className="row split med-detail-formdose-wrapper">
                    <div className="columm med-detail-formdose-col">
                        <h2 className="text-center">Add a Dose</h2>
                        <Doseform medId={this.props.match.params.medId} update={this.updateDoses}/>
                    </div>
                    <div className="column med-detail-formdose-col">
                        <div className="column med-detail-doses">
                            {
                                this.state.doses && this.state.doses.length > 0 ?
                                <div>
                                    <h2 className="text-center">Your Doses</h2>
                                    {this.state.doses.map((x, i) => (
                                        <Dosedetail key={i}
                                        delete={() => this.deleteDose(x.id)}
                                        note={x.note}
                                        dose={x.dose}
                                        time={x.time}/>
                                    ))}
                                </div> :
                                <div className="meddetail-exp">
                                    <h3>Your Scheduled Doses will appear here.</h3>
                                    <p>Use the form to add some dosages and times.</p>
                                    <p>Time must be entered in this format "X:XX" or "XX:XX". For Example: "8:00" or "12:00".
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <h1 className="meddetaildrugtitle text-center">
                    Label Info for {this.props.match.params.brandname}:
                </h1>
                <div>
                    {
                        this.state.medInfo.length > 0 &&
                        this.state.medInfo.map(x => {
                            return <Meddetailitem key={x[0]} title={x[0].replace(/_/gi, ' ')} text={x[1]} />
                        })
                    }
                </div>
            </div> 
        )

    }


}


export default Meddetail;