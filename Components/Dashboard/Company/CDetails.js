import React, { Fragment } from 'react';
import { View } from 'react-native';
import { connect } from "react-redux";
import DefaultPicC from "../../../defaultPicC.jpg";
import { BlockC, UnBlockC } from '../../../Store/Actions/AdminActions';
import Loader from '../../Loader/Loader';
import {Icon} from 'react-native-elements';
import {View, Text, Table, Row, Rows, StyleSheet, Image} from 'react-native';

const CDetails = (props) => {
    const goBack = () => {
        props.history.push("/Companies")
    }
    const currentCompany = props.allCompanies.find(com => {
        return com.userId === props.match.params.id;
    })
    const companyInfo = (props) => {
        super(props);
        this.state = {
            tableTitle: ['Company Name', 'Established', 'HR Name', 'Email', 'Contact Number'],
            tableData: [currentCompany.cname, currentCompany.es, currentCompany.hrname, currentCompany.email, currentCompany.cnum]
        }
    }
    return (
        <View>
            {props.user ? (<Fragment>{currentCompany ? (<View style={styles.container}>
                <View style={styles.grey - text, textDecoration = 'underline', styles.form_a} onClick={goBack}>
                    <Icon name="material-icons">Arrow back</Icon></View>
                <View style={styles.row}>
                    <View style={styles.col, styles.s12, styles.m12, styles.l6, styles.offset - l3}>
                        <View style={styles.card}>
                            <View style={styles.card - image}>
                                <Image source={DefaultPicC} alt="user-profile" style={styles.pImage} />
                                {props.Status === "Admin" ? (props.isUserBlocked ? (
                                    <Text style={styles.btn - floating, styles.halfway - fab, styles.waves - effect, styles.waves - light, color = 'orange', styles.lighten - 2} onClick={() => { props.unBlockC(currentCompany.companyID, currentCompany.userId, props.BlockedUser.key) }}>
                                        <Icon name="material-icons">How to reg</Icon></Text>) : (<Text style={styles.btn - floating, styles.halfway - fab, styles.waves - effect, styles.waves - light, color = 'orange', styles.lighten - 2} onClick={() => { props.blockC(currentCompany.companyID, currentCompany.userId) }}><Icon name="material-icons">Block</Icon></Text>)) : (null)}
                            </View>
                            <View style={style.card - content}>
                                <View style={styles.card - title, styles.orange - text}>
                                    <Text style={styles.hide - on - small - only}> COMPANY'S INFORMATION </Text>
                                </View>
                                <View style={styles.card - title, styles.orange - text}>
                                    <Text style={styles.hide - on - med - and - up}> COMPANY'S INFORMATION </Text>
                                </View>

                                <Table>
                                    <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                                    <Rows data={state.tableData} textStyle={styles.text} />
                                </Table>

                            </View>
                        </ View>
                    </ View>
                </ View></ View>) : (<View style={textAlign = 'center', styles.grey - text, styles.lighten - 3}>Loading. . . . </View>)}</Fragment>) : (<Loader />)}</View>
    );
}
const mapStateToProps = (state, ownProps) => {
    const CompanyUserId = ownProps.match.params.id;
    const isUserBlocked = state.admin.blockList.some(v => v.userId === CompanyUserId);
    const specificBU = state.admin.blockList.find(v => v.userId === CompanyUserId);
    return {
        user: state.auth.currentUser,
        allCompanies: state.company.allCompanies,
        Status: state.auth.status,
        isUserBlocked: isUserBlocked,
        BlockedUser: specificBU,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        blockC: (cid, cuid) => dispatch(BlockC(cid, cuid)),
        unBlockC: (cid, cuid, bukey) => dispatch(UnBlockC(cid, cuid, bukey)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CDetails);