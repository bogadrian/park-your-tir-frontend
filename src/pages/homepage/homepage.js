import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAddress } from '../../redux/coordsReducer/coords-selector';
import { selectUser } from '../../redux/userReducer/user-selector';
import './homepage.scss';

import MapComponent from '../../components/main/home-places/map';
import FetchAddress from '../../components/reuseble/fetch-address/fetch-address';

const HomePage = ({ address, currentUser }) => {
  return (
    <React.Fragment>
      <div className="homepage-container">
        <div className="fetch-address">
          {address ? <h2>{address}</h2> : null}
          <FetchAddress />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <MapComponent />
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  address: selectAddress,
  currentUser: selectUser
});
export default connect(mapStateToProps)(HomePage);
