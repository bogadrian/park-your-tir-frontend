import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ImageUpload from '../../../reuseble/ImageUpload/image-upload';
import { startPhoto } from '../../../../redux/coordsReducer/coords-action';

import './upload3photo.scss';

const Upload3Photo = ({ startPhoto, ...props }) => {
  const [fileImg, setFile] = useState([]);

  useEffect(() => {
    startPhoto(fileImg);
  }, [fileImg, startPhoto]);

  const fileHandler = file => {
    setFile([...fileImg, file]);
  };

  return (
    <div className="upload3">
      <ImageUpload onInput={fileHandler} />
      <ImageUpload onInput={fileHandler} />
      <ImageUpload onInput={fileHandler} />
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  startPhoto: photo => dispatch(startPhoto(photo))
});
export default connect(null, mapDispatchToProps)(Upload3Photo);
