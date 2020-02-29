import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';
import { startUpdatePlace } from '../../../redux/updateDelete/updateDelete-actions';
import Modal from '../../../components/reuseble/modal/modal';
import CustomButton from '../../../components/reuseble/custom-button/custom-button';

import { deletePlace } from '../../../redux/setPlace/setPlace-action';
import './update-place.scss';

const UpdateDeletePlace = ({ place, deletePlace, history }) => {
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const deletePlaceHandler = () => {
    setConfirm(true);
  };
  const handleModal = () => {
    deletePlace(place.id);
    setShow(true);
  };
  const handleModalExit = () => {
    setConfirm(false);
  };

  const handleModalClose = () => {
    setShow(false);
    setConfirm(false);
  };
  return (
    <div className="update-container">
      <Modal
        show={confirm}
        header="Delete Place?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleModal}>YES</CustomButton>}
        secondButton={
          <CustomButton handleClick={handleModalExit}>NO</CustomButton>
        }
      >
        ARE YOU SURE YOU WANT TO DELETE THIS PLACE?
      </Modal>
      <Modal
        show={show}
        header="Place Deleted"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <CustomButton handleClick={handleModalClose}>CLOSE</CustomButton>
        }
      >
        "The Place was deleted!"
      </Modal>
      <CustomButton
        handleClick={() => history.push(`/update-place/${place.id}`)}
      >
        Update Place
      </CustomButton>
      <CustomButton handleClick={deletePlaceHandler}>Delete Place</CustomButton>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

const mapDispatchToProps = dispatch => ({
  startUpdatePlace: placeData => dispatch(startUpdatePlace(placeData)),
  deletePlace: placeId => dispatch(deletePlace(placeId))
});

const UpdateDeletePlaceWithRouter = withRouter(UpdateDeletePlace);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateDeletePlaceWithRouter);
