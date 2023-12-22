import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from '../auth/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

function Sidebar() {


  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>Your Logo</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/packages">Packages</NavLink>
        </li>
        <li>
          <NavLink to="/reservations">Reservations</NavLink>
        </li>
        <li>
        <Logout/>
        </li>
      </ul>
    </nav>
  );
}

// Map the necessary state to props
const mapStateToProps = (state) => ({
  loggedInStatus: state.login_auths.loggedin || 'empty',
});

// Connect the component to the Redux store
export default connect(mapStateToProps)(Sidebar);