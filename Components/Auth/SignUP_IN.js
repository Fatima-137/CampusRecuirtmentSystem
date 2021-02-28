import React, { Component, Fragment } from 'react';
import Button from '../../IUComponents/Button';
import InputS from '../../IUComponents/InputS';
import An from '../../IUComponents/An';
import { connect } from "react-redux"
import { LOGIN, error, SIGNUP } from '../../Store/Actions/authActions';
import Type from '../../Store/const/Types';
import {View, Text, Form} from 'react-native';


class SignUPIN extends Component {
    constructor() {
        super();
        this.state = {
            UserEmail: '',
            UserPass: '',
            Status: '',
            SignUp: false,
            LogIn: true,
            name: ''
        }
    }
    componentDidMount() {
        const Status = this.props.status;
        this.setState({ Status })
    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.LogIn) {
            if (this.state.UserEmail === '') {
                this.props.LoginVE()
                return
            }
            else if (this.state.UserPass === '') {
                this.props.LoginVP()
                return
            }
            this.props.logIn(this.state.UserEmail, this.state.UserPass);
        }
        else if (this.state.SignUp) {
            if (this.state.UserEmail === '') {
                this.props.SignUpVE()
                return
            }
            else if (this.state.UserPass === '') {
                this.props.SignUpVP()
                return
            }
            else if (this.state.Status === '') {
                this.props.SignUpVS()
                return
            }
            this.props.signUp(this.state.UserEmail, this.state.UserPass, this.state.Status);
        }
    }

    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        this.props.error()
    }
    whenClick = () => {
        this.setState({
            UserEmail: '',
            UserPass: '',
            SignUp: true,
            LogIn: false,
        })

    }
    WhenClick = () => {
        this.setState({
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: true,
        })
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    {this.state.LogIn ? (<View style={style.row}>
                        <View stylee={styles.col, styles.s12, styles.m6, styles.l6, styles.offset-l3, styles.offset-m3}>
                            <View dtyle={styles.card, styles.z-depth-2}>
                                <Form onSubmit={this.onAdd}>
                                    <View style={styles.card-content, color='orange', styles.lighten-5}>
                                        <View style={styles.card-title, styles.z-depth-1, textAlign='center', color='orange', styles.darken-4, styles.white-text}>{this.state.Status} Sign In</View>
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="lemail" e={this.props.lemail} m={this.props.lmess} d="lemail" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.props.lpass} m={this.props.lmess} d="pass" l='Password' />
                                    </View>
                                    <View style={styles.card-action, color='orange', styles.lighten-5}>
                                        <Button cn="btn form_bu waves-effect waves-light orange darken-3" t="Sign in" />
                                        {this.state.Status === "Admin" ? (null) : (<Fragment> <Text style={styles.grey-text, styles.darken-1}>Don't have an account?</Text>  <An cn="orange-text text-darken-2 form_a text" t="Sign up" oc={this.whenClick} /> </Fragment>)}
                                    </View> 
                                </Form>
                            </View>
                        </View>
                    </View>) : (null)}
                    {this.state.SignUp ? (<View style={styles.row}>
                        <View  style={styles.col, styles.s12, styles.m6, styles.l6, styles.offset-l3, styles.offset-m3}>
                            <View  style={styles.card, styles.z-depth-2}>
                                <Form onSubmit={this.onAdd}>
                                    <View  style={styles.card-content, color='orange', styles.lighten-5}>
                                        <View style={styles.card-title, styles.z-depth-1, textAlign='center', color='orange', styles.darken-4, styles.white-text}>{this.state.Status} Sign Up</View>
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="semail" e={this.props.semail} m={this.props.smess} d="semail" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.props.spass} m={this.props.smess} d="pass" l='Password' />
                                    </View>
                                    <View  style={styles.card-action, color='orange', styles.lighten-5}>
                                        <Button cn="btn form_bu waves-effect waves-light orange darken-3" t="Sign up" />
                                        <Text stylee={styles.grey-text, styles.darken-1}>Already have an account?</Text> <An cn="orange-text text-darken-2 form_a text" t="Sign in" oc={this.WhenClick} />
                                    </View>
                                </Form>
                            </View>
                        </View>
                    </View>) : (null)}
                </View>
            </View>
        )
    }
}
const mapdispatchToProps = (dispatch) => {

    return {
        logIn: (email, pass) => dispatch(LOGIN(email, pass)),
        error: () => dispatch(error()),
        signUp: (email, pass, status) => dispatch(SIGNUP(email, pass, status)),
        LoginVE: () => dispatch({ type: Type.logInVE }),
        LoginVP: () => dispatch({ type: Type.logInVP }),
        SignUpVE: () => dispatch({ type: Type.SignUpVE }),
        SignUpVP: () => dispatch({ type: Type.SignUpVP }),
        SignUpVS: () => dispatch({ type: Type.SignUpVS }),

    }
}
const mapStateToProps = (state) => {
    return {
        lemail: state.signIn.email,
        lpass: state.signIn.pass,
        lmess: state.signIn.errorMessage,
        semail: state.signUp.email,
        spass: state.signUp.pass,
        smess: state.signUp.errorMessage,
        signUpUser: state.signUp.signUpUser
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(SignUPIN);
