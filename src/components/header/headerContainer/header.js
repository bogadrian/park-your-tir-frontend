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
          <div style={{ fontFamily: 'Lobster' }}>Park Your Tir</div>
        </Link>
      </div>

      <div className="options">
        {currentUser ? (
          <Link to="/create-place">
            <h2
              style={{
                backgroundColor: '#1c9aae',
                color: 'white',
                padding: '10px',
                marginLeft: '20px',
                marginRigth: '20px'
              }}
            >
              Create Place
            </h2>
          </Link>
        ) : (
          <h3>Please login to create a place!</h3>
        )}
        {!currentUser ? <LoggedOut /> : <LoggedIn />}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
export default connect(mapStateToProps)(Header);
