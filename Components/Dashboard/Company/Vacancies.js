import React, { Fragment } from 'react';
import { connect } from "react-redux";
import Loader from '../../Loader/Loader';
import {View, Table, Row, Rows, Text} from 'react-native';

const allVacancies = (props) => {

    super(props);
    this.state = {
        tableTitle : ['Serail Number', 'Company Name', 'Job Name', 'Job Description', 'Salary', 'Eligibilty Criteia'],
        tableData : [v.postId, v.cname, v.jobname, v.jobdes, v.salary, v.ec]
    }

}
const unBlockedVacanies = (props) => {
    super(props);
    this.state = {
        tableTitle : ['Serail Number', 'Company Name', 'Job Name', 'Job Description', 'Salary', 'Eligibilty Criteia'],
        tableData : [v.postId, v.cname, v.jobname, v.jobdes, v.salary, v.ec]
    }

}
 

const Vacancies = (props) => {
    return (<Fragment>
        <View style={styles.container, styles.hide-on-small-only}> 
         {props.user ? (props.status === "Admin" ? (props.allVacancies.length > 0 ? (<View style={styles.row">
           <View style={styles.col, styles.l12, styles.s2, styles.m12}>
                <Table>
                    <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                    {props.allVacancies.map((v, i) => {
                    <Rows data={state.tableData} textStyle={styles.text} />
                    {++i}
                }
                </Table>
                                
            </View>
        </View>) : (<View style={textAlign='center'}>
           <Text style={styles.orange-text, styles.text-darken-1}>No Company has posted any vacancy yet!</Text>
        </View>)) : (props.unBlockedVacanies.length > 0 ? (<View style={styles.row}>
           <View style={styles.col, styles.l12, styles.s2, styles.m12}>
           <Table>
                    <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                    {props.unBlockedVacancies.map((v, i) => {
                    <Rows data={state.tableData} textStyle={styles.text} />
                    {++i}
                }
            </Table>
                     
            </View>
        </View>) : (<View style={textAlign='center'>
           <Text style={styles.orange-text, styles.text-darken-1}>No Company has posted any vacancy yet!</Text>
        </View>))) : (<Loader />)}</View>



        <View style={styles.container, styles.hide-on-med-and-up}>  
         {props.user ? (props.status === "Admin" ? (props.allVacancies.length > 0 ? (
        <View style={styles.row}>
           <View style={styles.col, styles.l12, styles.s2, stylesm12}>

           <Table>
               <Text>All Vacancies</Text>
                    <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                    {props.allVacancies.map((v, i) => {
                    <Rows data={state.tableData} textStyle={styles.text} />
                    {++i}
                }
                </Table>
                    
                                </Fragment>)
            </View>
        </View>) : (<View style={textAlign='center'}>
           <Text style={styles.orange-text, styles.text-darken-1}>No, Company has posted any vacancy yet!</Text>
        </View>)) : (props.unBlockedVacanies.length > 0 ? (<View style={styles.row}>
           <View style={styles.col, styles.l12, styles.s2, styles.m12}>
           <Table>
               <Text>All Vacancies</Text>
                    <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                    {props.allVacancies.map((v, i) => {
                    <Rows data={state.tableData} textStyle={styles.text} />
                    {++i}
                }
                </Table>
                                    
             </Fragment>)
            
            </View>
        </View>) : (<View style={textAlign='center'}>
           <Text style={styles.orange-text, styles.text-darken-1}>No, Company has posted any vacancy yet!</Text>
        </View>))) : (<Loader />)}</View>
    </Fragment>
    );
}
const mapStateToProps = (state) => {
    const unBlockedVacanies = state.vacancy.allVacancies.filter(v => !v.block)
    return {
        user: state.auth.currentUser,
        allVacancies: state.vacancy.allVacancies,
        status: state.auth.status,
        unBlockedVacanies,
    }
}
export default connect(mapStateToProps)(Vacancies);