import React, { Fragment } from 'react'
import { Text, View } from 'react-native';
import { connect } from "react-redux";
import { DeleteVacancy } from "../../../Store/Actions/VacancyActions";
import {Icon} from 'react-native-elements';
import {View, Text} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const Profile = (props) => {
    const currentStudent = props.allStudents.find(stu => {
        return stu.userId === props.user.uid
    })
    const currentCompany = props.allCompanies.find(com => {
        return com.userId === props.user.uid
    })
    const currentCompanyVacancies = props.allVacancies.filter(van => {
        return van.userId === props.user.uid
    })
    const studentsPro = (props) => {
        super(props);
        this.state = {
        tableTitle: ['First Name', 'Surname', 'Age', 'Gender', 'Qualification', 'Skills', 'Department', 'Email', 'Contact Number'],
        tableData: [currentStudent.firstName, currentStudent.lastName, currentStudent.age, currentStudent.gender, currentStudent.qua, currentStudent.skills, currentStudent.dep, currentStudent.email, currentStudent.phoneNumber]
        }
      }
    const companyPro = (props) => {
        super(props);
        this.state = {
            tableTitle: ['Company Name', 'Established', 'HR Name', 'Email', 'Contact Number'],
            tableData: [currentCompany.cname, currentCompany.es, currentCompany.hrname, currentCompany.email, currentCompany.cnum]   
        }
    }
    currentCompanyVacancies.map(v);
    const Postvacancies = (props) => {
        super(props);
        this.state = {
            tableTitle: ['Job Name', 'Job Description', 'Salary', ' Eligibility Criteria', ''],
            tableData: [v.postId, v.jobname, v.jobdes, v.salary, v.ec]
        }
    }
    return ( 
        <View> 
            {props.user ? (props.status === "Student" ? (<View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col, styles.s12, styles.m8, styles.l6, styles.offset-l3, styles.offset-m2}>
                        <View style={styles.card, color='orange', styles.lighten-5}>
                            <View style={styles.card-image}>
                                <Image source={DefaultPic} alt="user-profile" style={styles.pImage} />
                                {props.isDisabledS ? (<Text style={styles.btn-floating, styles.halfway-fab, styles.waves-effect, styles.waves-light, color='grey', styles.lighten-2}><Icon name="material-icon">Add</Icon></Text>) : (<Text style={styles.btn-floating, styles.halfway-fab, styles.waves-effect, styles.waves-light, color='orange', styles.lighten-2} onClick={() => { props.history.push("/Registration") }}><Icon name="material-icons">Add</Icon></Text>)}
                            </View>
                            <View style={styles.card-content}>
                                <View style={styles.card-title, styles.orange-text}>
                                    STUDENT'S PROFILE
                            </View>
                            <Table>
          <Row data={state.tableTitle} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
                            </View>
                        </View>
                    </View>
                </View>
            </View>) : (<View style={styles.row}>
                <View style={styles.col, styles.l4, styles.s12, styles.offset-l1}>
                    <View style={styles.card}>
                        <View style={styles.card-image}>
                            <Image source={DefaultPicC} alt="user-profile" style={styles.pImage} />
                            {props.isDisabledC ? (
                                <Text style={styles.btn-floating, styles.halfway-fab, styles.waves-effect, styles.waves-light, color='grey', styles.lighten-2}><Icon name="material-icons">Add</Icon></Text>) : (<Text style={styles.btn-floating, styles.halfway-fab, styles.waves-effect, styles.waves-light, color='orange', styles.lighten-2} onClick={() => { props.history.push("/CompanyInfo") }}><Icon name="material-icons">Add</Icon></Text>)}
                        </View>
                        <View style={styles.card-content}>
                            <View style={styles.card-title, styles.orange-text}>
                                COMPANY'S INFORMATION
                            </View>
                            <Table>
          <Row data={state.tableTitle} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
        </Table>
                                    
                        </View>
                    </View>
                </View>
                <View style={styles.col, styles.l7, styles.s12}>
                    <View style={styles.card}>
                        <View style={styles.card-content}>
                            <View style={styles.card-title, styles.orange-text}>
                                POSTED VACANCIES
                            </View>
                            {currentCompanyVacancies.length > 0 ? (<Fragment>
                                <Table>
          <Row data={state.tableTitle} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
          <Text style={styles.btn-floating, styles.btn-small, styles.waves-effect, styles.waves-light, color='orange', styles.lighten-2} onClick={() => { props.deleteVacancy(v.postId) }}>
              <Icon name="material-icons">Cancel</Icon>
              </Text>
        </Table>                      
                            </Fragment>) : (
                            <View styl={styles.red-text}>You didn't post any vacancy yet!</View>)}
                        </View>
                    </View>
                </View>
            </View>)) : (null)}
        </View>
    )
}
const mapStateToProps = (state) => {
    const userId = state.auth.currentUser ? (state.auth.currentUser.uid) : (null)
    const checkS = state.auth.currentUser ? (state.admin.Srequests.find(v => v.userId === userId)) : null;
    const checkC = state.auth.currentUser ? (state.admin.Crequests.find(v => v.userId === userId)) : null;
    return {
        user: state.auth.currentUser,
        status: state.auth.status,
        allStudents: state.student.allStudents,
        allCompanies: state.company.allCompanies,
        allVacancies: state.vacancy.allVacancies,
        isDisabledS: checkS,
        isDisabledC: checkC,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteVacancy: (did) => dispatch(DeleteVacancy(did)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);