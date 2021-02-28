import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Loader from "../../Loader/Loader";
import Department from "../../../IUComponents/Department";
import { View } from 'react-native';
import { ListGroupItem } from 'react-bootstrap';

class Students extends Component {
  constructor() {
    super();
    this.state = {
      depSelected: "",
      selectedDepArray: null,
      showSpecificStudents: false,
      showAllStudents: true,
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.props.status === "Admin") {
      const allStudents = this.props.allStudents;
      const Tem = allStudents.filter(v => v.dep === value)
      this.setState({
        selectedDepArray: Tem,
        showSpecificStudents: true,
        showAllStudents: false,
      })
    }
    else {
      const unBlockedStudents = this.props.unBlockedStudents;
      const Tem = unBlockedStudents.filter(v => v.dep === value)
      this.setState({
        selectedDepArray: Tem,
        showSpecificStudents: true,
        showAllStudents: false,
      })
    }
  }
  showAll = () => {
    this.setState({
      depSelected: "",
      selectedDepArray: null,
      showSpecificStudents: false,
      showAllStudents: true,
    })
  }

  details = (id, userId) => {
    this.props.history.push(`/SDetails/${id}`, userId)
  }

  render() {
    return (<Fragment>{
      this.props.User ? (
        <Fragment>
          {
            this.props.pervData ? (
              <View style={styles.container}>
                <Navigation style={styles.collection, styles.with - header}>
                  <ListItem style={styles.collection - header, styles.hide - on - small - only}><Text>Find Students</Text></ListItem>
                  <ListItem style={styles.collection - header, styles.hide - on - med - and - up}><Text>Find Students</Text></ListItem>
                  {this.props.status === "Admin" ? (this.props.allStudents.length > 0 ? (
                    <Fragment>
                      <ListItem style={styles.collection - item}>
                        <Department text="Select Department" f="selectD" id="selectD" n="depSelected" v={this.state.depSelected} oc={this.onChange} />
                        {this.state.showSpecificStudents ?
                          (<View style={textAlign = 'center'}>
                            <Button style={styles.btn - small, styles.waves - effect, styles.waves - light, color = 'orange', styles.darken - 1} onClick={this.showAll}>All Students</Button>
                          </View>) : null
                        }
                      </ListItem>
                      {this.state.showAllStudents ? (
                        this.props.allStudents.map((stu, index) => {
                          return (
                            <ListItem key={index} style={styles.collection - item, styles.avatar}>
                              <Icon name="btn btn-floating waves-effect waves-light orange material-icons circle" onClick={() => this.details(stu.id, stu.userId)}>Person</Icon>
                              <Text style={styles.title}>{stu.firstName}</Text>
                              <Text style={styles.grey - text}>{stu.dep}</Text>
                            </ListItem>)
                        })) : (null)
                      }
                      {this.state.showSpecificStudents ? (
                        <Fragment>
                          {this.state.selectedDepArray.length > 0 ? (
                            this.state.selectedDepArray.map((stu, index) => {
                              return (
                                <ListItem key={index} style={styles.collection - item, styles.avatar}>
                                  <Icon name="btn btn-floating waves-effect waves-light orange material-icons circle" onClick={() => this.details(stu.id, stu.userId)}>Person</Icon>
                                  <Text style={styles.title}>{stu.firstName}</Text>
                                  <Text style={styles.grey - text}>{stu.dep}</Text>
                                </ListItem>
                              )
                            })
                          ) : (
                              <View style={textAlign = 'center', styles.grey - text, styles.flow - text}>
                                Sorry, No Student available.
                              </View>)}
                        </Fragment>
                      ) : (null)
                      }
                    </Fragment>

                  ) : (
                      <View>
                        <View style={textAlign = 'center', styles.grey - text, styles.flow - text}>
                          Sorry, No Student available.
                          </View>
                      </View>)
                  ) : (this.props.unBlockedStudents.length > 0 ? (
                    <Fragment>
                      <ListItem style={styles.collection - item}>
                        <Department text="Select Department" f="selectD" id="selectD" n="depSelected" v={this.state.depSelected} oc={this.onChange} />
                        {this.state.showSpecificStudents ?
                          (<View style={textAlign = 'center'}>
                            <Button style={styles.btn - small, styles.waves - effect, styles.waves - light, colr = 'orange', styles.darken - 1} onClick={this.showAll}>All Students</Button>
                          </View>) : null
                        }
                      </ListItem>
                      {this.state.showAllStudents ? (
                        this.props.unBlockedStudents.map((stu, index) => {
                          return (
                            <ListItem key={index} style={styles.collection - item, styles.avatar}>
                              <Icon style={styles.btn, styles.btn - floating, styles.waves - effect, styles.waves - light, color = 'orange', styles.material - icons, styles.circle} onClick={() => this.details(stu.id, stu.userId)}>Person</Icon>
                              <Text style={styles.title}>{stu.firstName}</Text>
                              <Text style={styles.grey - text}>{stu.dep}</Text>
                            </ListItem>)
                        })) : (null)
                      }
                      {this.state.showSpecificStudents ? (
                        <Fragment>
                          {this.state.selectedDepArray.length > 0 ? (
                            this.state.selectedDepArray.map((stu, index) => {
                              return (
                                <ListItem key={index} style={styles.collection - item, styles.avatar}>
                                  <Icon style={styles.btn, styles.btn - floating, styles.waves - effect, styles.waves - light, color = 'orange', styles.material - icons, styles.circle} onClick={() => this.details(stu.id, stu.userId)}>Person</Icon>
                                  <Text style={styles.title}>{stu.firstName}</Text>
                                  <Text style={styles.grey - text}>{stu.dep}</Text>
                                </ListItem>
                              )
                            })
                          ) : (
                              <View style={textAlign = 'center', styles.grey - text, styles.flow - text}>
                                Sorry, No Student available.
                              </View>)}
                        </Fragment>
                      ) : (null)
                      }
                    </Fragment>

                  ) : (
                      <View>
                        <View style={textAlign = 'center', styles.grey - text, styles.flow - text}>
                          Sorry, No Student available.
                          </View>
                      </View>)
                    )}
                </Navigation>
              </View>) : (<Loader />)
          }
        </Fragment>
      ) : (<Loader />)
    }
    </Fragment>)
  }
}
const mapStateToProps = (state) => {
  const unBlockedStudents = state.student.allStudents.filter(v => !v.block);
  console.log(unBlockedStudents);
  return {
    allStudents: state.student.allStudents,
    pervData: state.student.pervDataOfStudents,
    User: state.auth.currentUser,
    status: state.auth.status,
    unBlockedStudents,
  }
}
export default connect(mapStateToProps, null)(Students)