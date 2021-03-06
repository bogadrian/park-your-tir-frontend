import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import FetchAddress from '../fetch-address/fetch-address';
import FetchCoords from '../fetch-coords/fetch-coords';
import { selectAddress } from '../../../redux/coordsReducer/coords-selector';

const Address = ({ address }) => {
  return (
    <div className="address-container">
      <div className="gro">
        <h2>{address}</h2>
        <div className="adress-buttons">
          <FetchAddress />
          <FetchCoords />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  address: selectAddress
});
export default connect(mapStateToProps)(Address);
