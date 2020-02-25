import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { startFetch } from '../../redux/fetchPlace/fetchPlace-action';
import PlaceDataName from '../../components/main/place-data/place-data';

import ImageUpload from '../../components/reuseble/ImageUpload/image-upload';
import Modal from '../../components/reuseble/modal/modal';

import { selectPlaceItem } from '../../redux/fetchPlace/fetchPlace-selector';

import { selectCoordsFull } from '../../redux/coordsReducer/coords-selector';
import { startPatch } from '../../redux/setPlace/setPlace-action';

import './updDelPlace.scss';

const UpdDelPlace = ({ place, placeData, startFetch, startPatch }) => {
  const na = place.name;
  const de = place.description;

  const [fileImg, setFile] = useState([]);
  console.log(fileImg);
  const [show, setShow] = useState(false);
  const placeId = useParams().placeId;

  useEffect(() => {
    startFetch(placeId);
  }, [startFetch, placeId]);

  let n, d;
  if (placeData.desc) {
    n = placeData.name.payload;
    d = placeData.desc.payload;
  }

  let name, desc;
  if (!n) {
    name = na;
  } else {
    name = n;
  }

  if (!d) {
    desc = de;
  } else {
    desc = d;
  }

  const data = { name, desc, fileImg, placeId };

  const handleClick = () => {
    startPatch(data);
    setShow(true);
  };
  const fileHandler = file => {
    setFile([...fileImg, file]);
  };
  const handleError = () => {
    setShow(false);
  };

  return (
    <div className="container-place-update">
      <Modal
        show={show}
        header="Place Updated"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleError}>CLOSE</CustomButton>}
      >
        "The Place was updated!"
      </Modal>
      <div style={{ height: 400 }}>
        <PlaceDataName place={place} name={place.na} desc={place.de} />
      </div>
      <div className="photo-container">
        <ImageUpload onInput={fileHandler} />
        <ImageUpload onInput={fileHandler} />
        <ImageUpload onInput={fileHandler} />
      </div>
      <div className="button-update">
        <CustomButton type="click" handleClick={handleClick}>
          Update Place
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem,
  placeData: selectCoordsFull
});

const mapDispatchToProps = dispatch => ({
  startFetch: placeId => dispatch(startFetch(placeId)),
  startPatch: data => dispatch(startPatch(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdDelPlace);
