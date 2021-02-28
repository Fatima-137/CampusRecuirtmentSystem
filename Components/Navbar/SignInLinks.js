import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {Navigation, ListItem} from 'react-native';
import { NavLink } from "react-router-dom";


const SignInLinks = (props) => {
    const char = props.email.slice(0, 1)
    return (
        <Navigation style={styles.right}>
            {props.status === "Admin" ? (<ListItem>
                <NavLink to="/">Requests</NavLink>
            </ListItem>) : (null)}
            {props.status === "Company" ? (<ListItem>
                <NavLink to="/">Students</NavLink>
            </ListItem>) : (null)}
            {props.status === "Admin" ? (<ListItem>
                <NavLink to="/Students">Students</NavLink>
            </ListItem>) : (null)}
            {props.status === "Student" ? (<ListItem>
                <NavLink to="/">Vacancies</NavLink>
            </ListItem>) : (null)}
            {props.status === "Admin" ? (<ListItem>
                <NavLink to="/Vacancies">Vacancies</NavLink>
            </ListItem>) : (null)}
            {props.status === "Admin" || props.status === "Student" ? (<ListItem>
                <NavLink to="/Companies">Companies</NavLink>
            </ListItem>) : (null)}
            {props.status === "Company" ? (<ListItem>
                <NavLink to="/PostVacancy">Post New Vacancy</NavLink>
            </ListItem>) : (null)}
            <ListItem>
                <NavLink to="/SignOut">Sign Out</NavLink>
            </ListItem>
            {props.status === "Company" || props.status === "Student" ? (<ListItem>
                <NavLink to="/Profile" style={styles.btn, styles.btn-floating, color='orange', styles.darken-3}>{char}</NavLink>
            </ListItem>) : (null)}
        </Navigation>
    );
}
const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
    }
}
export default connect(mapStateToProps)(SignInLinks);