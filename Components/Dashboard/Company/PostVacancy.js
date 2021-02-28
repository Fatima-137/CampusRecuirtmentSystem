import React, { Component, Fragment } from 'react';
import Input from '../../../IUComponents/Input';
import Button from '../../../IUComponents/Button';
import { connect } from "react-redux";
import { addNewVacancy, RemoveErrorMessagesPC, ErrorPostC } from '../../../Store/Actions/VacancyActions';
import Loader from '../../Loader/Loader';
import {View, Text, Form} from 'react-native';



class PostVacancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JobName: "",
            JobDes: "",
            Salary: "",
            EC: "",
            block: false,
        };
    }
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        this.props.removeError();
    }
    onAdd = (event) => {
        event.preventDefault();
        const { JobName,
            JobDes,
            Salary,
            EC, } = this.state;
        if (JobName === "" ||
            JobDes === "" ||
            Salary === "" ||
            EC === "") {
            this.props.error("All fields are required!");
            return;
        }
        else if(JobName.length > 25){
            this.props.error("Please enter Job Name properly.");
            return;
        }
        else if(JobName.length < 2){
            this.props.error("Please enter Job Name properly.");
            return;
        }
        else if(JobDes.length > 35){
            this.props.error("Please enter Job description properly.");
            return;
        }
        else if(JobDes.length < 5){
            this.props.error("Please enter Job description properly.");
            return;
        }
        else if(Salary < 5000){
            this.props.error("Salary can't be less than 5k.");
            return;
        }
        else if(Salary > 1000000){
            this.props.error("Salary can't be more than 1000000.")
            return;
        }
        else if(EC.length > 35){
            this.props.error("Please enter Eligibility Criteria properly.");
            return;
        }
        else {
            this.props.newVacancy({
                userId: this.props.currentUser.uid,
                jobname: JobName,
                jobdes: JobDes,
                salary: Salary,
                ec: EC,
                cname: this.props.currentCompany.cname,
                block: this.state.block,
            })
        }
        this.setState({
            JobName: "",
            JobDes: "",
            Salary: "",
            EC: "",
        })
        this.props.history.push("/Profile")
    }
    render() {
        return (
            <Fragment>
                {this.props.currentUser ? (
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={color='orange',  styles.col, styles.l12, styles.s12, styles.darken-1, styles.white-text, textAlign='center', styles.flow-text}>
                                Post New Vacancy
                            </View>
                            {this.props.errorFlag ? (
                                <View style={styles.col, styles.l12, styles.s12, textAlign='center', color='grey', styles.lighten-3, styles.red-text}>
                                    <Text>
                                        {this.props.errorMessagePostC}
                                    </Text>
                                </View>
                            ) : (null)}
                            <Form onSubmit={this.onAdd}>
                                <View style={color='orange', styles.col, styles.l12, styles.s12, styles.lighten-5}>
                                </View>
                                <View style={color='orange', styles.col, styles.l12, styles.s12, styles.lighten-5}>
                                    <Input v={this.state.JobName} oc={this.whenChange} t="text" f='jobName' d='jobName' l='Job Name' n="JobName" />
                                </View>
                                <View style={color='orange', styles.col, styles.l12, styles.s12, styles.lighten-5}>
                                    <Input v={this.state.JobDes} oc={this.whenChange} t="text" f='jobDes' d='jobDes' l="Job description" n="JobDes" />
                                </View>
                                <View style={color='orange', styles.col, styles.l12, styles.s12, styles.lighten-5}>
                                    <Input v={this.state.Salary} oc={this.whenChange} t="number" f='salary' d='salary' l='Salary' n="Salary" />
                                </View>
                                <View style={color='orange', styles.col, styles.l12, styles.s12, styles.lighten-5}>
                                    <Input v={this.state.EC} oc={this.whenChange} t="text" f='ec' d='ec' l='Eligibility Criteria' n="EC" />
                                </View>
                                <View style={styles.col, styles.l12, styles.s12}>
                                </View>
                                <View style={styles.col, styles.s4, styles.l2, styles.offset-s4, styles.offset-l5}>
                                    <Button cn="btn-large waves-effect waves-light orange darken-1" t="Post" />
                                </View>
 
                            </Form>
                        </View>
                    </View>
                ) : (<Loader />)}
            </Fragment>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newVacancy: (obj) => dispatch(addNewVacancy(obj)),
        removeError: () => dispatch(RemoveErrorMessagesPC()),
        error: (mess) => dispatch(ErrorPostC(mess)),
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        errorMessagePostC: state.vacancy.errorMessage,
        errorFlag: state.vacancy.errorFlag,
        currentCompany: state.company.allCompanies.find(v => v.userId === state.auth.currentUser.uid)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostVacancy);