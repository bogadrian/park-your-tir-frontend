import React from 'react';
import { connect } from 'react-redux';

import './my-profile.scss';

const MyProfile = ({ currentUser }) => {
  return (
    <div className="myprofile__container">
      <h1>My profile</h1>{' '}
      <img
        className="photoProfile"
        src={`https://bogdan-park-your-tir.herokuapp.com/api/v1/static/img/users/${currentUser.data.user.photo}`}
        alt="user"
      />
      <div className="my-profile__data">{currentUser.data.user.name}</div>{' '}
      <div className="my-profile__data">{currentUser.data.user.email}</div>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
export default connect(mapStateToProps)(MyProfile);
