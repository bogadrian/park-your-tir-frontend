import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button';
import {
  fetchAddressFromCoords,
  fetchCoordsFromAdress
} from '../../../redux/appis/apiUtils';
import {
  startFetchCoords,
  startSetAddressToDisplay
} from '../../../redux/coordsReducer/coords-action';

import './fetch-address.scss';

const FetchAddress = ({ startFetchCoords, startSetAddressToDisplay }) => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoords] = useState(null);

  const handleInput = e => {
    const addr = e.target.value;
    setAddress(addr);
  };

  const fetchAddress = async e => {
    e.preventDefault();
    //make call to server with address, wait for response and put it on store
    if (address) {
      const coords = await fetchCoordsFromAdress(address);

      const { lat, lng } = coords.data.data;
      const latlng = `${lat},${lng}`;

      const add = await fetchAddressFromCoords(latlng);
      startSetAddressToDisplay(add.data.data);
      if (coords.data.data) {
        setCoords(coords.data.data);
      }
    }
  };

  useEffect(() => {
    startFetchCoords(coordinates);
  }, [coordinates, startFetchCoords]);

  return (
    <div className="address-container">
      <div className="gro">
        <form>
          <input className="input" onChange={handleInput} />
          <label className="form-input-label">
            Search Parking Arround An Address
          </label>
          <CustomButton type="submit" handleClick={fetchAddress}>
            Find Address
          </CustomButton>
        </form>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  startFetchCoords: coords => dispatch(startFetchCoords(coords)),
  startSetAddressToDisplay: address =>
    dispatch(startSetAddressToDisplay(address))
});
export default connect(null, mapDispatchToProps)(FetchAddress);
