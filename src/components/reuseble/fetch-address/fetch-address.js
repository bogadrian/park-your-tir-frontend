import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button';
import FormInput from '../input-form/input-form';
import { VALIDATOR_MINLENGTH } from '../../../utils/validators';
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

  const handleInput = useCallback((id, value, isValid) => {
    setAddress(value);
  }, []);

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
          <FormInput
            id="input"
            element="input"
            label="City Name, Streat, Number"
            texterror="Search Parking Arround An Address"
            validators={[VALIDATOR_MINLENGTH(2)]}
            onInput={handleInput}
            required={true}
          />

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
