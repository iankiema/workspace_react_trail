// Sidebar.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faLinkedinIn,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons';
import Logout from '../auth/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3 className="logo-text">Executive Workspaces</h3>
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
          <NavLink to="/book-reservation">Book Now</NavLink>
        </li>
        <li>
          <Logout />
        </li>
      </ul>

      {/* Social Media Icons */}
      <div className="social-media-icons-container">
        <FontAwesomeIcon icon={faFacebookF} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faGooglePlusG} />
        <FontAwesomeIcon icon={faLinkedinIn} />
        <FontAwesomeIcon icon={faPinterestP} />
      </div>

      {/* Copyright Information */}
      <div className="copyright-info">
        &copy; 2023 Executive Workspaces LLC
      </div>
    </nav>
  );
}

export default Sidebar;
