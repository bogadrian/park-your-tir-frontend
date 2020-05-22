import React, { useRef, useState, useEffect } from 'react';

import './image-upload.scss';
import CustomButton from '../custom-button/custom-button';
import Resizer from 'react-image-file-resizer';

const ImageUpload = props => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [preview, setPreview] = useState(null);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImage = () => {
    filePickerRef.current.click();
  };

  // const fileChangeHandler = photo => {
  //   var fileInput = false;
  //   if (photo) {
  //     fileInput = true;
  //   }
  //   if (fileInput) {
  //     Resizer.imageFileResizer(
  //       photo,
  //       700,
  //       500,
  //       'JPEG',
  //       100,
  //       0,
  //       uri => {
  //         props.onInput(uri);
  //       },
  //       'blob'
  //     );
  //   }
  // };

  const fileHandler = e => {
    const photo = e.target.files[0];
    if (!photo && photo === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setFile(photo);
    //fileChangeHandler(photo);
    props.onInput(photo);
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        ref={filePickerRef}
        id="photo"
        name="photo"
        style={{ display: 'none' }}
        onChange={fileHandler}
      />
      <div className="image-container">
        {preview && <img src={preview} className="image" alt="Preview" />}
      </div>
      {!preview && <p>Please choose a photo</p>}
      <CustomButton type="button" disabled={isValid} handleClick={pickImage}>
        Upload a image
      </CustomButton>
    </div>
  );
};

export default ImageUpload;
