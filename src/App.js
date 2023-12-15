// App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
  }

  handleSuccessfulAuth = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  };

  handleLogout = () => {
    // Add logic to clear the user session on the server, if applicable

    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  };

  render() {
    return (
      <div className='app'>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Home loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} />}
            />
        

            <Route
              path="/dashboard"
              element={<Dashboard loggedInStatus={this.state.loggedInStatus === "LOGGED_IN"} />}
            />
            <Route
              path="/register"
              element={<Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />}
            />
            <Route
              path="/login"
              element={<Login handleSuccessfulAuth={this.handleSuccessfulAuth} />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
