import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ImageLogo from '../logo/logo';
import LoggedIn from '../loggedIn/loggedIn';
import LoggedOut from '../loggedOut/loggedOut';

import './header.scss';

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <ImageLogo className="logo" />
        </Link>
        <Link className="site-title" to="/">
          <div>Park Your Tir</div>
        </Link>
      </div>
      <div className="options">
        {!currentUser ? <LoggedOut /> : <LoggedIn />}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
export default connect(mapStateToProps)(Header);
