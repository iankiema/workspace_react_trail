// Home.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    const { loggedInStatus, handleLogout } = this.props;

    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {loggedInStatus}</h1>

        {loggedInStatus === 'NOT_LOGGED_IN' && (
          <div>
            <h2>Choose an option:</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}

        {loggedInStatus === 'LOGGED_IN' && (
          <div>
            <p>Welcome, you are already logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}
