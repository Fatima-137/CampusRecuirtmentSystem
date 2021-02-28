import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import DashBoard from './Components/Dashboard/DashBoard';
import {connect} from "react-redux";
import { CURRENTUSER } from './Store/Actions/authActions';
import SignOut from './Components/Auth/SignOut';
import Registration from './Components/Dashboard/Student/Registration';
import Info from './Components/Dashboard/Company/Info';
import PostVacancy from './Components/Dashboard/Company/PostVacancy';
import Profile from './Components/Dashboard/UserProfile/Profile';
import {PervDataOfStudents} from "./Store/Actions/StudentsAction";
import Students from './Components/Dashboard/Student/Students';
import SDetails from "./Components/Dashboard/Student/SDetails";
import CDetails from "./Components/Dashboard/Company/CDetails";
import { PervDataOfCompanies } from './Store/Actions/CompanyActions';
import Vacancies from './Components/Dashboard/Company/Vacancies';
import Blocked from './Components/Dashboard/Admin/Blocked';
import Request from './Components/Dashboard/Admin/Request';
import Loader from './Components/Loader/Loader';
import Companies from './Components/Dashboard/Company/Companies';


class App extends Component {
  componentDidMount = () => {
    this.props.currentUser();
    this.props.pervDataOfStudents();
    this.props.pervDataOfCompanies();
  }
  render() {
    return (
      <View style={styles.App}>
        {this.props.User ? (this.props.Status ? (this.props.Status === "Admin" ? (<Router>
          <Fragment>
            <Navbar />
            <Switch>
                  <Route exact path="/" component={Request}/>
                  <Route exact path="/Students" component={Students} />
                  <Route exact path="/Companies" component={Companies} />
                  <Route exact path="/Vacancies" component={Vacancies} />
                  <Route exact path="/SDetails/:id" component={SDetails} />
                  <Route exact path="/CDetails/:id" component={CDetails} />
                  <Route exact path="/SignOut" component={SignOut}/>
            </Switch>
          </Fragment>
        </Router>): (this.props.Status === "Student" ? (this.props.regS ? (<Router>
          <Fragment>
            <Navbar />
            <Switch>
                  <Route exact  path="/" component={Vacancies} />
                  <Route exact path="/Companies" component={Companies} />
                  <Route exact  path="/CDetails/:id" component={CDetails} />
                  <Route exact  path="/Registration" component={Registration}/> 
                  <Route exact  path="/Profile" component={Profile}/> 
                  <Route exact  path="/SignOut" component={SignOut}/>
            </Switch>
          </Fragment>
        </Router>): (<Registration />)) : (this.props.regC ? (<Router>
          <Fragment>
            <Navbar />
            <Switch>
                  <Route exact  path="/" component={Students} />
                  <Route exact  path="/SDetails/:id" component={SDetails} />
                  <Route exact  path="/CompanyInfo" component={Info}/>
                  <Route exact  path="/PostVacancy" component={PostVacancy} />
                  <Route exact  path="/Profile" component={Profile}/> 
                  <Route exact  path="/SignOut" component={SignOut}/>
            </Switch>
          </Fragment>
        </Router>) : (<Info />)))) : (<Loader />)) : (this.props.userIsBlocked ? (<Blocked/>): (<DashBoard />))}
      </View>
    );
  }
}
const mapStateToProps = (state) => {

  const user = state.auth.currentUser ? state.auth.currentUser : null
  const status = state.auth.currentUser ? state.auth.status : null
  const regS = state.auth.currentUser ? state.student.allStudents.find(v => v.userId === user.uid) : null
  const regC = state.auth.currentUser ? state.company.allCompanies.find(v => v.userId === user.uid) : null
  return {
    User: user,
    Status: status,
    regS:regS,
    regC:regC,
    userIsBlocked: state.admin.userIsBlocked,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentUser: () => dispatch(CURRENTUSER()),
    pervDataOfStudents: () => dispatch(PervDataOfStudents()),
    pervDataOfCompanies: () => dispatch(PervDataOfCompanies()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
