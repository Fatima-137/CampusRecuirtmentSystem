import React, { Component, Fragment } from 'react';
import SignUPIN from '../Auth/SignUP_IN';
import { View, Navigation, Text, ListItem } from 'react-native';
import {Icon} from 'react-native-elements';


class DashBoard extends Component {
    constructor() {
        super();
        this.state = {
            dashboard: true,
            signUp: false,
            status: "",
        }
    }
    showS = (s) => {
        this.setState({status: s, signUp: true, dashboard: false})
    }
    showDash = () => {
        this.setState({status: "", dashboard: true, signUp: false})
    }
    render() {
        return (
            <Fragment>
                {this.state.dashboard ? (<div style={styles.mainPage}>
 
                    <View style={styles.container, color='white'}>
                        <Text style={styles.orange-text, styles.text-darken-4, textAlign='center', styles.mainHeading, styles.hide-on-med-and-down}>
                            Welcome to Campus Recruitment System
                        </Text>
                        <Text style={styles.orange-text, styles.text-darken-4, textAlign='center', styles.mainHeading, styles.hide-on-large-only}>
                            Welcome to Campus Recruitment System
                        </Text>
                        <Text style={textAlign='center', styles.hide-on-med-and-down, styles.flow-text}>Please select one, in order to SignUp/SignIn.</Text>
                        <Text style={textAlign='center', styles.hide-on-large-only}>Please select one, in order to SignUp/SignIn.</Text>
                        <View style={styles.row}>
                            <View style={styles.col, styles.s6, styles.l6, styles.m6, styles.offset-l5, styles.offset-s3, styles.offset-m4}>
                                <Navigation>
                                    <ListItem style={styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => {this.showS("Student")}}>
                                        <Text>Student</Text>

                                    </ListItem>
                                    <ListItem style={styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => {this.showS("Company")}}>
                                        <Text>Company</Text>

                                    </ListItem>
                                    <ListItem style={styles.flow-text, styles.form_a, styles.orange-text, styles.text-lighten-1} onClick={() => {this.showS("Admin")}}>
                                        <Text>Admin</Text>
                                    </ListItem>
                                </Navigation>
                            </View>
                        </View>
 
                    </View>
                </div>) : (null)}
                {this.state.signUp ? (
                <Fragment>
                    <Navigation style={styles.nav-wrapper, styles.orange, styles.darken-4}>
                    <View style={styles.container}>
                        <Text style={styles.brand-logo, styles.hide-on-small-only}>Campus Recruitment System</Text>
                        <Text style={styles.hide-on-med-and-up}>Campus Recruitment System</Text>
                    </View>
                </Navigation> 
                    <View style={styles.container}>
                    <View style={styles.grey-text, styles.waves-effect, styles.waves-light, styles.underline, styles.form_a} onClick={this.showDash}> &nbsp;
                    <Icon name="material-icons">Arrow back</Icon></View>
                    </View>
                    <SignUPIN status={this.state.status}/>
                </Fragment>) : (null)}
            </Fragment>
        )
    }
}

export default DashBoard;