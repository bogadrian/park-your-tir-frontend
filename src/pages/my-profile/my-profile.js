import React from 'react';
import { connect } from 'react-redux';
import MyPlacesSpinner from '../../components/reuseble/my-places/my-place-spinner';
import { createStructuredSelector } from 'reselect';

import { selectMe } from '../../redux/getMe/getMe-selector';

import './my-profile.scss';
import ModifyMe from '../../components/users/modify-me/modify-me';

const MyProfile = ({ me }) => {
  return (
    <React.Fragment>
      <div className="myprofile-container">
        <div className="myplaces-container">
          <h2>My Places</h2>
          <MyPlacesSpinner />
        </div>
        <div className="myprofile-update">{me ? <ModifyMe /> : null}</div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  me: selectMe
});
export default connect(mapStateToProps)(MyProfile);
