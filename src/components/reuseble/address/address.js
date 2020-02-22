import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import FetchAddress from '../fetch-address/fetch-address';
import FetchCoords from '../fetch-coords/fetch-coords';
import { selectAddress } from '../../../redux/coordsReducer/coords-selector';

import './address.scss';

const Address = ({ address }) => {
  console.log(address);
  return (
    <div className="address-container">
      <div className="gro">
        <h2 style={{ marginTop: '0px' }}>{address}</h2>
        <FetchAddress />
        <FetchCoords />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  address: selectAddress
});
export default connect(mapStateToProps)(Address);
