import React, { Component, Fragment } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AuthService from "./components/auth/auth-service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
import TaskDetails from "./components/tasks/TaskDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  render() {
    this.fetchUser();
    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
        <Switch>
          {!this.state.loggedInUser ? (
            <Fragment>
              <Route
                exact
                path="/signup"
                render={() => <Signup getUser={this.getTheUser} />}
              />
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
            </Fragment>
          ) : (
            <Fragment>
              <Route exact path="/projects" component={ProjectList} />
              <Route exact path="/projects/:id" component={ProjectDetails} />
            </Fragment>
          )}
        </Switch>
      </div>
    );
  }
}

export default App;
