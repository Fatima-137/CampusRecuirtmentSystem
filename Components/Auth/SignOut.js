import React, { Fragment } from 'react';
import An from '../../IUComponents/An';
import { connect } from "react-redux"
import { LOGOUT } from "../../Store/Actions/authActions"
import { Text, View } from 'react-native';

const SignOut = (props) => {
    const whenClick = () => {
        props.history.push("/");
        props.logOut()
    }
    const WhenClick = () => {
      props.history.push("/");
    }
    return (<Fragment>
        {props.User ? (<View style={styles.container}>
           
            <View style={styles.row}>
            <View style={styles.col, styles.s10, styles.m, styles.l6, styles.offset-l3, styles.offset-m2}>
                    <View style={styles.card, color='orange', styles.lighten-5}>
                        <View style={styles.card-contnt}>
                            <Text  style={styles.card-title, styles.orange-text}>Sign out</Text>
                            <Text  style={styles.Black-text}>Are you sure, You want to Sign out?</Text>
                        </View>
                        <View style={styles.card-actin}>
                            <An cn="btn-small black-text waves-effect waves-light orange darken-3 white-text" t="Cancel" oc={WhenClick} />
                            &nbsp; &nbsp; &nbsp;
                        <An cn="btn-small black-text waves-effect waves-light orange darken-3 white-text" t="Sign out" oc={whenClick} />
                        </View>
                    </View>
                </View>
            </View>
        </View>) : (null)}</Fragment>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(LOGOUT())
    }
}
const mapStateToProps = (state) => {
    return {
        User: state.auth.currentUser,
        Status: state.auth.status,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);