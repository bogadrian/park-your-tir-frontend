import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAddress } from '../../redux/coordsReducer/coords-selector';
import './homepage.scss';

import MapComponent from '../../components/main/home-places/map';
import FetchAddress from '../../components/reuseble/fetch-address/fetch-address';

const HomePage = ({ address }) => {
  if (address) {
    console.log(address);
  }
  return (
    <div>
      <div className="homepage-container">
        <h1>The Homepage</h1>
        <FetchAddress />
        <h2>{address}</h2>
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
