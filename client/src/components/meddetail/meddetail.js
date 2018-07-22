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
            $.get(`/api/doses/${this.props.match.params.medId}`)
                .then(res => {
                    this.setState({
                        doses: res.data
                    })
                })
                .catch(err => this.props.history.push('/'));


            $.get(`/api/medInfo/${this.props.match.params.FDAId}`)
                .then( res=> {
                    this.setState({
                        medInfo: Object.entries(res.data)
                    });
                })
                .catch( error=> {
                console.log(error);
                });       
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
                <div className="row y-center">
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
                <div className="row split">
                    <Doseform medId={this.props.match.params.medId} update={this.updateDoses}/>
                    <div className="column med-detail-doses">
                        {
                            this.state.doses &&
                            this.state.doses.map((x, i) => (
                                <Dosedetail key={i}
                                delete={() => this.deleteDose(x.id)}
                                note={x.note}
                                dose={x.dose}
                                time={x.time}/>
                            ))
                        }
                    </div>
                </div>
                <h1 className="meddetaildrugtitle">
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