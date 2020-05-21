import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './loggedIn.scss';
import { signOutStart } from '../../../redux/userReducer/user-actions';
import { selectUser } from '../../../redux/userReducer/user-selector';
const urlActual = process.env.REACT_APP_URLC;

const LoggedIn = ({ currentUser, signOutStart }) => {
  return (
    <div>
      <div className="loggedIn-container">
        <Link className="link-logout" to="/" onClick={signOutStart}>
          SIGN OUT
        </Link>
        <Link to="/my-profile">
          <h4 className="name">{currentUser.data.user.name}</h4>
          <img
            className="photoUser"
            src={`${urlActual}/api/v1/img/users/${currentUser.data.user.photo}`}
            alt="user"
          />
        </Link>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});
export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
