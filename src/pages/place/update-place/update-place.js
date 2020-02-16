import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from '../../../redux/userReducer/user-selector';
import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';

import CustomButton from '../../../components/reuseble/custom-button/custom-button';

import './update-place.scss';

const UpdateDeletePlace = ({ user, place }) => {
  const updatePlace = placeId => {
    console.log('I will update this place by id');
  };

  const deletePlace = placeId => {
    console.log('I will delete this place by id');
  };
  return (
    <div className="update-container">
      <CustomButton handleClick={updatePlace}>Update Place</CustomButton>
      <CustomButton handleClick={deletePlace}>Delete Place</CustomButton>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
  place: selectPlaceItem
});

export default connect(mapStateToProps)(UpdateDeletePlace);
