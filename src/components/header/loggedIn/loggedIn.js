import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './loggedIn.scss';
import { signOutStart } from '../../../redux/userReducer/user-actions';

const LoggedIn = ({ currentUser, signOutStart }) => {
  return (
    <div>
      <div className="loggedIn-container">
        <Link className="link-logout" to="/" onClick={signOutStart}>
          SIGN OUT
        </Link>
        <Link to="/my-profile">
          <img
            className="photoUser"
            src={`http://127.1.1.0:3000/api/v1/img/users/${currentUser.data.user.photo}`}
            alt="user"
          />
        </Link>
        <Link to="/my-profile">
          <p className="name">{currentUser.data.user.name}</p>
        </Link>
      </div>
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
