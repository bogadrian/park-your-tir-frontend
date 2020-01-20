import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './loggedIn.scss';
import { signOutStart } from '../../../redux/userReducer/user-actions';

const LoggedIn = ({ currentUser, signOutStart }) => {
  return (
    <div>
      {currentUser ? (
        <div className="loggedIn-container">
          <Link className="link-logout" to="/" onClick={signOutStart}>
            SIGN OUT
          </Link>
          <Link to="/my-profile">
            <img
              className="photoUser"
              src={`https://bogdan-park-your-tir.herokuapp.com/api/v1/static/img/users/${currentUser.data.user.photo}`}
              alt="user"
            />
          </Link>
          <Link to="/my-profile">
            <p className="name">{currentUser.data.user.name.split(' ')[0]}</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
