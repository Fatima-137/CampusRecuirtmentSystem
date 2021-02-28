import React, { Component, Fragment } from 'react'
import SignInLinks from "./SignInLinks"
import { NavLink } from "react-router-dom";
// import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import Loader from '../Loader/Loader';
import { BlockList, PervDataOfUpdationRequests} from '../../Store/Actions/AdminActions';
import { PervDataOfVacancies } from '../../Store/Actions/VacancyActions';
import { Navigation, ListItem, Text, View } from 'react-native';

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      left: false,
    }
  }
  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };
  componentDidMount(){
    this.props.pervDataOfVacancies();
    this.props.pervDataOfBlockList();
    this.props.pervDataOfUpdationRequests();
  }
  render() {
    const sideList = (
      <View style={styles.list_width}>
        <Navigation style={styles.collection, styles.with-header}>
          <ListItem style={styles.collection-header, color='orange', styles.darken-3}>
            <Text style={styles.white-text}>
              {this.props.User ? (this.props.User.email) : (null)}
            </Text>
          </ListItem>
          {this.props.status === "Admin" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/" style={styles.orange-text}>Requests</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Company" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/" style={styles.orange-text}>Students</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Student" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/" style={styles.orange-text}>Vacancies</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Admin" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/Students" style={styles.orange-text}>Students</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Admin" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/Vacancies" style={styles.orange-text}>Vacancies</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Admin" || this.props.status === "Student" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/Companies" style={styles.orange-text}>Companies</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Company" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/PostVacancy" style={styles.orange-text}>Post New Vacancy</NavLink>
          </ListItem>) : (null)}
          {this.props.status === "Company" || this.props.status === "Student" ? (<ListItem style={styles.collection-item}>
            <NavLink to="/Profile" style={styles.orange-text}>Profile</NavLink>
          </ListItem>) : (null)}
          <ListItem style={styles.collection-item}>
            <NavLink to="/SignOut" style={styles.orange-text}>Sign Out</NavLink>
          </ListItem>
        </Navigation>
      </View>
    );
    return (
      <View>
        {this.props.User ? (<Fragment><Navigation style={styles.nav-wrapper, color='orange', styles.darken-4}>
          <View style={styles.container}>
            <Text onClick={this.toggleDrawer(true)} style={styles.btn-small, styles.btn-floating, styles.transparent, styles.hide-on-large-only}>
              <i style={styles.material-icons}>Menu</i>
            </Text>
 
        <Text style={dtyles.flow-text, color='orange', styles.darken-4, styles.hide-on-large-only}>Campus Recruitment System</Text>
            <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
              <View onClick={this.toggleDrawer(false)}>
                {sideList}
              </View>
            </Drawer>
            <Text style={styles.brand-logo, styles.hide-on-med-and-down}>Campus Recruitment System</Text>
            <ListViewComponent>
              <SignInLinks email={this.props.User.email} />
            </ListViewComponent>
          </View>
        </Navigation>
        </Fragment>) : (<Loader />)}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const user = state.auth.currentUser ? state.auth.currentUser : null
  return {
    User: user,
    status: state.auth.status
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    pervDataOfVacancies: () => dispatch(PervDataOfVacancies()),
    pervDataOfBlockList: () => dispatch(BlockList()),
    pervDataOfUpdationRequests: () => dispatch(PervDataOfUpdationRequests()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);