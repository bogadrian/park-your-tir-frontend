import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAddress } from '../../redux/coordsReducer/coords-selector';
import './homepage.scss';

import MapComponent from '../../components/main/home-places/map';
import FetchAddress from '../../components/reuseble/fetch-address/fetch-address';

const HomePage = ({ address }) => {
  return (
    <div>
      <div className="homepage-container">
        <h2>{address}</h2>
        <FetchAddress />
      </div>
      <div>
        <MapComponent />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  address: selectAddress
});
export default connect(mapStateToProps)(HomePage);
