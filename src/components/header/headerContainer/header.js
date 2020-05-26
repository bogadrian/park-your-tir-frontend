import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ImageLogo from '../logo/logo';
import LoggedIn from '../loggedIn/loggedIn';
import LoggedOut from '../loggedOut/loggedOut';
import GetMessages from './getMessages/getMessages';

import { selectUser } from '../../../redux/userReducer/user-selector';
import './header.scss';

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <ImageLogo className="logo" />
        </Link>
        <Link className="site-title" to="/">
          <div style={{ fontFamily: 'Lobster' }}>Park Your Tir</div>
        </Link>
      </div>

      <div className="options">
        <GetMessages />
        {currentUser ? (
          <a href={`http://localhost:5001/create-place`}>
            <div className="create-place-button">Create Place</div>
          </a>
        ) : (
          <h3>Please login to create a place!</h3>
        )}
        {!currentUser ? <LoggedOut /> : <LoggedIn />}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps)(Header);
