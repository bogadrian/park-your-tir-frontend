import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { usePosition } from 'use-position';
import CustomButton from '../custom-button/custom-button';

import { fetchAddressFromCoords } from '../../../redux/appis/apiUtils';
import {
  startFetchCoords,
  startSetAddressToDisplay
} from '../../../redux/coordsReducer/coords-action';

import './fetch-adress.scss';

const FetchCoords = ({ startFetchCoords, startSetAddressToDisplay }) => {
  let { latitude, longitude } = usePosition();
  const [coordinates, setCoords] = useState(null);

  let latlng = `${latitude},${longitude}`;

  const fetchCoords = async () => {
    if (latlng !== undefined) {
      const add = await fetchAddressFromCoords(latlng);

      setCoords({ lat: latitude, lng: longitude });
      startSetAddressToDisplay(add.data.data);
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      startFetchCoords(coordinates);
    }
    return () => {
      clean = false;
    };
  }, [coordinates, startFetchCoords]);

  return (
    <div className="address-container">
      <div className="gro">
        <CustomButton type="submit" handleClick={fetchCoords}>
          GeoLocation
        </CustomButton>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  startFetchCoords: coords => dispatch(startFetchCoords(coords)),
  startSetAddressToDisplay: address =>
    dispatch(startSetAddressToDisplay(address))
});
export default connect(null, mapDispatchToProps)(FetchCoords);
