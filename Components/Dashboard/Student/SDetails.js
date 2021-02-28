import React, { Fragment } from 'react'
import { View } from 'react-native';
import { connect } from "react-redux"
import DefaultPic from '../../../defaultPic.jpg';
import { BlockS, UnBlockS } from '../../../Store/Actions/AdminActions';
import Loader from '../../Loader/Loader';

const SDetails = (props) => {
    const goBack = () => {
        if (props.Status === "Company") {
            props.history.push("/")
        }
        if (props.Status === "Admin") {
            props.history.push("/Students")
        }
    }
    const studentsDetail = (props) => {
        super(props);
        this.state = {
            tableTitle: ['First Name', 'Surname', 'Age', 'Gender', 'Qualification', 'Skills', 'Department', 'Email', 'Contact Number'],
            tableData: [currentStudent.firstName, currentStudent.lastName, currentStudent.age, currentStudent.gender, currentStudent.qua, currentStudent.skills, currentStudent.dep, currentStudent.email, currentStudent.phoneNumber]
        }
    }
    const { student } = props
    return (
        <View style={styles.container}>
            {props.currentUser ? (
                props.student ? (
                    <Fragment>
                        <View style={styles.grey - text, styles.underline, styles.form_a} onClick={goBack}>
                            <Icon name="material-icons">Arrow back</Icon></View>
                        <View style={styles.row}>
                            <View style={styles.col, styles.s12, styles.m12, styles.l6, styles.offset - l3}>
                                <View style={styles.card}>
                                    <View style={styles.card - image}>
                                        <Image source={DefaultPic} alt="user-profile" style={styles.pImage} />
                                        {props.Status === "Admin" ? (props.isUserBlocked ? (<Text style={styles.btn - floating, styles.halfway - fab, styles.waves - effect, styles.waves - light, color = 'orange', styles.lighten - 2} onClick={() => { props.unBlockS(student.id, student.userId, props.BlockedUser.key) }}><Icon name="material-icons">How to reg</Icon>
                                        </Text>) : (<Text style={styles.btn - floating, styles.halfway - fab, styles.waves - effect, styles.waves - light, color = 'orange', styles.lighten - 2} onClick={() => { props.blockS(student.id, student.userId) }}><Icon Name="material-icons">Block</Icon></Text>)) : (null)}
                                    </View>
                                    <View style={styles.card - content}>
                                        <View style={styles.card - title, styles.red - text}>
                                            STUDENT DETAILS
                                </View>

                                        <Table>
                                            <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                                            <Rows data={state.tableData} textStyle={styles.text} />
                                        </Table>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Fragment>) : (<View style={styles.center, styles.grey - text, styles.lighten - 3}>Loading...... </View>)
            ) : (<Loader />)}
        </View>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const specific = state.student.allStudents.find((student) => {
        return student.id === id
    })
    const StudentUserId = ownProps.location.state;
    const isUserBlocked = state.admin.blockList.some(v => v.userId === StudentUserId)
    const specificBU = state.admin.blockList.find(v => v.userId === StudentUserId)
    return {
        student: specific,
        currentUser: state.auth.currentUser,
        Status: state.auth.status,
        isUserBlocked: isUserBlocked,
        BlockedUser: specificBU,
    }
}
const mapDispactToProps = (dispatch) => {
    return {
        blockS: (sid, suid) => dispatch(BlockS(sid, suid)),
        unBlockS: (sid, suid, bukey) => dispatch(UnBlockS(sid, suid, bukey)),
    }
}
export default connect(mapStateToProps, mapDispactToProps)(SDetails)
