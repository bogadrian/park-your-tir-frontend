import React from 'react';

import './my-profile.scss';
import ModifyMe from '../../components/modify-me/modify-me';

const MyProfile = () => {
  return (
    <React.Fragment>
      <div className="myprofile-container">
        <div className="myprofile-update">
          <ModifyMe />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
