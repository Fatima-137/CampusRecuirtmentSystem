import React, { Component, Fragment } from 'react';
import Button from '../../../IUComponents/Button';
import { connect } from "react-redux";
import InputS from '../../../IUComponents/InputS';
import { addNewCompany, RemoveErrorMessagesC, ErrorInfoC } from '../../../Store/Actions/CompanyActions';
import { UpdationRequest } from '../../../Store/Actions/AdminActions';
import Loader from '../../Loader/Loader';
import {View, Text, Button, Navigation, Form} from 'react-native';


class Info extends Component {
    constructor() {
        super();
        this.state = {
            CompanyName: "",
            Established: "",
            HRName: "",
            Email: "",
            ContactNumber: "",
            edit: false,
            editID: "",
            block: false,
        };
    }

    componentDidMount() {
        this.setState({Email: this.props.currentUser.email})
        if (this.props.currentUser) {
            const userID = this.props.currentUser.uid
            if (this.props.allCompanies) {
                let allCompanies = this.props.allCompanies
                let specific = allCompanies.find((com) => {
                    return com.userId === userID
                })
                if (specific) {
                    this.setState({
                        CompanyName: specific.cname,
                        Established: specific.es,
                        HRName: specific.hrname,
                        Email: specific.email,
                        ContactNumber: specific.cnum,
                        edit: true,
                        editID: specific.companyID,
                        block: specific.block
                    })
                }
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.currentUser) {
            const userID = nextProps.currentUser.uid
            if (nextProps.allCompanies) {
                let allCompanies = nextProps.allCompanies
                let specific = allCompanies.find((com) => {
                    return com.userId === userID
                })
                if (specific) {
                    this.setState({
                        CompanyName: specific.cname,
                        Established: specific.es,
                        HRName: specific.hrname,
                        Email: specific.email,
                        ContactNumber: specific.cnum,
                        edit: true,
                        editID: specific.companyID,
                        block: specific.block,
                    })
                }
            }
        }
    }

    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        this.props.removeError();
    }
    whenSubmit = (event) => {
        event.preventDefault();
        const { CompanyName,
            Established,
            HRName,
            Email,
            ContactNumber,
        } = this.state;

        if (CompanyName === "" &&
            Established === "" &&
            HRName === "" &&
            Email === "" &&
            ContactNumber === "") {
            this.props.error("Please fill this form properly!")
            return;
        }
        else if (CompanyName === "") {
            this.props.error('Please enter your company name.')
            return;
        }
        else if (CompanyName.length > 30) {
            this.props.error('Please enter company name properly.')
            return;
        }
        else if (CompanyName.length < 2) {
            this.props.error('Please enter company name properly.')
            return;
        }
        else if (Established === "") {
            this.props.error("Please enter your company established year")
            return;
        }
        else if (Established.length > 4 || Established.length < 4) {
            this.props.error("Please enter company establish year properly.")
            return;
        }
        else if (HRName === "") {
            this.props.error('Please enter your HR name.')
            return;
        }
        else if (HRName.length > 25) {
            this.props.error('Please enter HR name properly.')
            return;
        }
        else if (HRName.length < 2) {
            this.props.error('Please enter HR name properly')
            return;
        }
        else if (HRName.indexOf("@") !== -1 || HRName.indexOf(".") !== -1 || HRName.indexOf(",") !== -1 || HRName.indexOf("!") !== -1) {
            this.props.error("Please enter HR name properly");
            return;
        }
        else if (Email === "") {
            this.props.error("Please enter your valide email address.")
            return;
        }
        else if (Email.indexOf("@") === -1 || Email.indexOf(".com") === -1 ||
            Email.indexOf(" ") !== -1) {
            this.props.error("Please enter your valid email address.")
            return;
        }
        else if (ContactNumber === "") {
            this.props.error("Please enter your contact number.")
            return;
        }
        else if (ContactNumber.indexOf(" ") !== -1 || ContactNumber.indexOf("-") !== -1 ||
            ContactNumber.length < 11 || ContactNumber.length > 11) {
            this.props.error("Please enter your 11 digit contact number.")
            return;
        }
        else if (this.state.edit) {
            this.props.UpdateRequest({
                userId: this.props.currentUser.uid,
                cname: CompanyName,
                es: Established,
                hrname: HRName,
                email: Email,
                cnum: ContactNumber,
                editId: this.state.editID,
                status: this.props.status,
                block: this.state.block,
            });
            this.props.history.push("/Profile");
        }
        else {
            this.props.newCompany({
                userId: this.props.currentUser.uid,
                cname: CompanyName,
                es: Established,
                hrname: HRName,
                email: Email,
                cnum: ContactNumber,
                block: this.state.block,
            })
        }
    }
    render() {
        return (
            <Fragment>
                {this.props.currentUser ? (<Fragment>
                    {this.state.edit ? (null) : (<Navigation style={styles.nav-wrapper, color='orange', styles.darken-4}>
                        <View style={styles.container}>
                            <Text style={styles.brand-logo, styles.hide-on-small-only}>Campus Recruitment System</Text>
                            <Text style={styles.hide-on-med-and-up}>Campus Recruitment System</Text>
                        </View>
                    </Navigation>)}
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <View style={styles.col, styles.l8, styles.s12, styles.offset-l2}>
                                <View style={styles.card}>
                                    <Form onSubmit={this.whenSubmit}>
                                        <View style={styles.card-content}>
                                            <View style={styles.card-title, styles.orange-text, styles.text-darken-2, textAlign='center'}>
                                                Company Registration Form
                                        </View>
                                            {this.props.errorFlag ? (<View style={textAlign='center', color='grey', styles.lighten-3, styles.red-text}><Text>{this.props.errorMessageC} </Text></View>) : (null)}
                                            {this.state.edit ? (null) : <InputS edit={this.state.edit} t="text" l="Comapny Name" n="CompanyName" v={this.state.CompanyName} oc={this.whenChange} d="cname" f="cname" />}
                                            <InputS edit={this.state.edit} t="text" l="Established" n="Established" v={this.state.Established} oc={this.whenChange} d="es" f="es" />
                                            <InputS edit={this.state.edit} t="text" l="HR Name" n="HRName" v={this.state.HRName} oc={this.whenChange} d="hrname" f="hrname" />
                                            <InputS edit={this.state.edit} t="number" l='Contact Number' n="ContactNumber" v={this.state.ContactNumber} oc={this.whenChange} d="cn" f="cn" />
                                            <View style={styles.card-action}>
                                                {this.state.edit ? (
                                                    <Button cn="btn-large waves-effect waves-light  orange darken-1" t="Update Request" />
                                                ) : (
                                                    <Button cn="btn-large waves-effect waves-light orange darken-1" t="Register" />)}
                                            </View>
                                        </View>
                                    </Form>
                                </View>
                            </View>
                        </View>
                    </View>
                </Fragment>) : (<Loader />)}
            </Fragment>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newCompany: obj => dispatch(addNewCompany(obj)),
        removeError: () => dispatch(RemoveErrorMessagesC()),
        error: mess => dispatch(ErrorInfoC(mess)),
        UpdateRequest: cdata => dispatch(UpdationRequest(cdata)),
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
        allCompanies: state.company.allCompanies,
        errorMessageC: state.company.errorMessage,
        errorFlag: state.company.errorFlag,
        status: state.auth.status,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Info);