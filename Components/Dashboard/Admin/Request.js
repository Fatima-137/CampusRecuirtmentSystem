import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Loader from '../../Loader/Loader';
import { RequestSAccept, RequestCAccept, RequestCCancel, RequestSCancel } from '../../../Store/Actions/AdminActions';
import { Text, View, Table, Row, Rows, Navigation } from 'react-native';
import { NavItem } from 'react-bootstrap';
import {Icon} from 'react-native-elements';

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showDS: false,
            showDC: false,
            SObj: null,
            Cobj: null,
        };
    }
    updateDataStudents = (props) => {
        super(props);
        this.state = {
            tableTitle: ['First Name', 'Surname', 'Age', 'Gender', 'Qualification', 'Skills', 'Department', 'Email', 'Contact Number'],
            tableData: [SObj.firstName, SObj.lastName, SObj.age, SObj.gender, SObj.qua, SObj.skills, SObj.dep, SObj.email, SObj.phoneNumber]
        }
    }

    updateDataCompanies = (props) => {
        super(props);
        this.state = {
            tableTitle: ['Company Name', 'Established', 'HR Name', 'Email', 'Contact Number'],
            tableData: [Cobj.cname, Cobj.es, Cobj.hrname, Cobj.email, Cobj.cnum]
        }
    }
    dS = (uid) => {
        const TemObjS = this.props.AllSrequests.find(v => v.userId === uid)
        this.setState({ show: false, showDS: true, showDC: false, SObj: TemObjS, Cobj: "" })
    }
    dC = (uid) => {
        const TemObjC = this.props.AllCrequests.find(v => v.userId === uid)
        this.setState({ show: false, showDS: false, showDC: true, SObj: "", Cobj: TemObjC })
    }
    show = () => {
        this.setState({ show: true, showDC: false, showDS: false, SObj: "", Cobj: "" })
    }
    render() {
        return (
            <View>{this.props.user ? (<Fragment>
                {this.state.show ? (<View>
                    <View style={styles.row}>
                        <View style={styles.col, styles.s12, styles.l7, styles.offset - l3}>
                            <View style={styles.card}>
                                <Navigation style={styles.collection, styles.with - header, styles.myCollections}>
                                    <ListItem style={styles.collection - header}><Text style={styles.orange - text}>Student Requests</Text></ListItem>
                                    {this.props.AllSrequests.length > 0 ? (this.props.AllSrequests.map(v => <li key={v.userId} style={styles.collection - NavItem, styles.myCollections}>
                                        <Text><Text>{v.firstName} {v.lastName}</Text></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content}>
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.props.RequestSCancel(v.urid) }}>Highlight off</Icon>
                                        </Button>
                                        <Text style={styles.secondary - content}></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content}>
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.props.RequestSAccept(v.editId, v.urid) }}>Check circle outline</Icon>
                                        </Button>
                                        <Text style={styles.secondary - content}></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content}>
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.dS(v.userId) }}>Info</Icon>
                                        </Button>
                                    </ListItem>)) : (<View style={textAlign = 'center', styles.grey - text, styles.flow - text}>No Requests.</View>)}
                                    <ListItem style={styles.collection - item, styles.myCollections}></ListItem>
                                </Navigation>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col, styles.s12, styles.l7, styles.offset - l3}>
                            <View style={styles.card}>
                                <Navigation style={styles.collection, styles.with - header, styles.myCollections}>
                                    <ListItem style={styles.collection - header}><Text style={styles.orange - text}>Companies Requests</Text></ListItem>
                                    {this.props.AllCrequests.length > 0 ? (this.props.AllCrequests.map(v => <ListItem key={v.userId} style={styles.collection - item, styles.myCollections}>
                                        <Text><Text>{v.cname}</Text></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content} >
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.props.RequestCCancel(v.urid) }}>Highlight off</Icon>
                                        </Button>
                                        <Text style={styles.secondary - content}></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content} >
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.props.RequestCAccept(v.editId, v.urid) }}>Check circle outline</Icon>
                                        </Button>
                                        <Text style={styles.secondary - content}></Text>
                                        <Button style={styles.btn - small, styles.btn - floating, styles.waves - effect, styles.waves - light, styles.transparent, styles.secondary - content} >
                                            <Icon name="material-icons orange-text text-darken-3" onClick={() => { this.dC(v.userId) }}>Info</Icon>
                                        </Button>
                                    </ListItem>)) : (<View style={textAlign = 'center', styles.grey - text, styles.flow - text}>No Requests.</View>)}
                                    <ListItem style={styles.collection - item, styles.myCollections}></ListItem>
                                </Navigation>
                            </View>
                        </View>
                    </View>
                </View>) : (null)}
                {this.state.showDS ? (<View style={styles.container}>
                    <View style={styles.grey - text, textDecoration = 'underline', styles.form_a} onClick={this.show}><Icon name="material-icons">Arrow back</Icon></View>
                    <View style={styles.ow}>
                        <View style={styles.col, styles.s12, styles.m6, styles.l6, styles.offset - l3}>
                            <View style={styles.card}>
                                <View style={styles.card - content}>
                                    <View style={styles.card - title, styles.red - text}>
                                        Updation Data
                                </View>
                                    <Table>
                                        <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                                        <Rows data={state.tableData} textStyle={styles.text} />
                                    </Table>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>) : (null)}
                {this.state.showDC ? (<View style={stylex.container}>
                    <View style={styles.grey - text, textDecoration = 'underline', styles.form_a} onClick={this.show}><Icon name="material-icons">Arrow back</Icon></View>
                    <View style={styles.row}>
                        <View style={styles.col, styles.s12, styles.m6, styles.l6, styles.offset - l3}>
                            <View style={styles.card}>
                                <View style={styles.card - content}>
                                    <View style={styles.card - title, styles.orange - text}>
                                        Updation Data
                                    </View>
                                    <Table>
                                        <Row data={state.tableTitle} style={styles.head} textStyle={styles.text} />
                                        <Rows data={state.tableData} textStyle={styles.text} />
                                    </Table>


                                </View>
                            </View>
                        </View>
                    </View>
                </View>) : (null)}
            </Fragment>) : (<Loader />)}</View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        AllSrequests: state.admin.Srequests,
        AllCrequests: state.admin.Crequests,
        user: state.auth.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RequestSAccept: (editId, UpdationId) => dispatch(RequestSAccept(editId, UpdationId)),
        RequestCAccept: (editId, UpdationId) => dispatch(RequestCAccept(editId, UpdationId)),
        RequestSCancel: (UpdationId) => dispatch(RequestSCancel(UpdationId)),
        RequestCCancel: (UpdationId) => dispatch(RequestCCancel(UpdationId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Request);