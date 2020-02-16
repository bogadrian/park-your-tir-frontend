import React from 'react';

import './my-profile.scss';
import ModifyMe from '../../components/users/modify-me/modify-me';
import MyPlaces from '../../components/reuseble/my-places/my-places';

const MyProfile = () => {
  return (
    <React.Fragment>
      <div className="myprofile-container">
        <div className="myplaces-container">
          <h2>My Places</h2>
          <MyPlaces />
        </div>
        <div className="myprofile-update">
          <ModifyMe />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
