import React from 'react';
import Type from '../../../Store/const/Types';
import { connect } from "react-redux";
import { LOGOUT } from '../../../Store/Actions/authActions';
import { Text, View } from 'react-native';
import {View, Text, Button} from 'react-native'; 

const Blocked = (props) => {
    return (
        <View style={styles.container}>
 
            <View style={color='orange', styles.lighten-4, textAlign='center'}>
                <Text style={styles.flow-text, styles.hide-on-small-only}>Your Account has been blocked by Admin!</Text>
                <Text style={styles.hide-on-med-and-up}>Your Account has been blocked by Admin!</Text>
 
                <Button style={styles.btn-small, styles.waves-effect, styles.waves-light, color='orange'} onClick={() => {props.logOut(); props.goBack();}}>Go Back To SignUp/SignIn</Button>
 
            </View>
        </View>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => dispatch({ type: Type.userIsNotBlocked}),
        logOut: () => dispatch(LOGOUT()),
    }
}
export default connect(null, mapDispatchToProps)(Blocked);