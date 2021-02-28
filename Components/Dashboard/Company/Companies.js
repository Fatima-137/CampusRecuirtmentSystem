import React, { Fragment } from 'react';
import Loader from '../../Loader/Loader';
import { connect } from "react-redux";
import {Icon} from "react-native-elements";
import {View, Text, Navigation, ListItem} from 'react-native';

const Companies = (props) => {
    const details = (id) => {
        props.history.push(`/CDetails/${id}`)
    }
    return (
        <Fragment>
            {props.user ? (<View style={styles.container}>
                <Navigation style={styles.collection, styles.with-header}>
                    <ListItem style={styles.collection-header, styles.hide-on-small-only}><Text>All Companies</Text></ListItem>
                    <ListItem style={styles.collection-header, styles.hide-on-med-and-up}><Text>All Companies</Text></ListItem>
                    {props.status === "Admin" ? (props.allCompanies.length > 0 ? (
                        props.allCompanies.map(com => {
                            return (
                                <ListItem key={com.companyID} style={styles.collection-item, styles.myCollections}>
                                    <Text style={styles.title}>{com.cname}</Text>
                                    <Text style={styles.btn-floating, styles.waves-effect, styles.waves-light, styles.btn-small, color='orange', styles.secondary-content} onClick={() => details(com.userId)}>
                                        <Icon name="material-icons white-text text-darken-3">Info</Icon>
                                    </Text>
                                </ListItem>
                            )
                        })
                    ) : (
                            <View style={textAlign='center', styles.grey-text, styles.flow-text}>
                                Sorry, No Company available.
                              </View>)) : (props.unBlockedCompanies.length > 0 ? (
                            props.unBlockedCompanies.map(com => {
                                return (
                                    <ListItem key={com.companyID} style={styles.collection-item, styles.myCollections}>
                                        <Text style={styles.title}>{com.cname}</Text>
                                        <Text style={styles.btn-floating, styles.waves-effect, styles.waves-light, styles.btn-small, color='orange', styles.secondary-content} onClick={() => details(com.userId)}>
                                            <Icon name="material-icons white-text text-darken-3">Info</Icon>
                                        </Text>
                                    </ListItem>
                                )
                            })
                        ) : (
                                <View style={textAlign='center', styles.grey-text, styles.flow-text}>
                                    Sorry, No Company available.
                              </View>))}
                    <ListItem style={styles.collection-item, styles.myCollections}></ListItem>
                </Navigation></View>) : (<Loader />)}
        </Fragment>
    );
}
const mapStateToProps = (state) => {
    const unBlockedCompanies = state.company.allCompanies.filter(v => !v.block)
    return {
        user: state.auth.currentUser,
        allCompanies: state.company.allCompanies,
        status: state.auth.status,
        unBlockedCompanies,
    }
}
export default connect(mapStateToProps)(Companies);