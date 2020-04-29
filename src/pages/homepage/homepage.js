import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAddress } from '../../redux/coordsReducer/coords-selector';
import './homepage.scss';

import MapComponent from '../../components/main/home-places/map';
import FetchAddress from '../../components/reuseble/fetch-address/fetch-address';

const HomePage = ({ address }) => {
  return (
    <React.Fragment>
      <div className="homepage-container">
        <div className="fetch-address">
          {address ? <h2>{address}</h2> : null}
          <FetchAddress />
        </div>
        <div>
          <MapComponent />
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  address: selectAddress
});
export default connect(mapStateToProps)(HomePage);
