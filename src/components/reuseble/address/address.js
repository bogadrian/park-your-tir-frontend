import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { usePosition } from 'use-position';
import CustomButton from '../custom-button/custom-button';
import {
  fetchAddressFromCoords,
  fetchCoordsFromAdress
} from '../../../redux/appis/apiUtils';
import { startFetchCoords } from '../../../redux/coordsReducer/coords-action';

import './address.scss';

const Address = ({ startFetchCoords, ...props }) => {
  const { latitude, longitude } = usePosition();
  let latlng = `${latitude},${longitude}`;

  const fetchCoords = async () => {
    if (latlng !== undefined) {
      const add = await fetchAddressFromCoords(latlng);
      setCoords({ lat: latitude, lng: longitude });
      setAddressToDisplay(add.data.data);
    }
  };

  const [addressToDisplay, setAddressToDisplay] = useState(
    'check the address here'
  );
  const [address, setAddress] = useState(null);
  const [coordinates, setCoords] = useState(null);
  console.log(coordinates);

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
      setAddressToDisplay(add.data.data);
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
            Search Address and Create place
          </label>
          <CustomButton type="submit" handleClick={fetchAddress}>
            Find Address
          </CustomButton>
          <h1>{addressToDisplay}</h1>
        </form>
        <CustomButton type="submit" handleClick={fetchCoords}>
          Create a place where you are now!
        </CustomButton>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  startFetchCoords: coords => dispatch(startFetchCoords(coords))
});
export default connect(null, mapDispatchToProps)(Address);
