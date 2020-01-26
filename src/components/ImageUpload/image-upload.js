import React, { useRef, useState } from 'react';

import './image-upload.scss';
import CustomButton from '../custom-button/custom-button';

const ImageUpload = props => {
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  const pickImage = () => {
    filePickerRef.current.click();
  };

  const fileHandler = e => {
    const photo = e.target.files[0];
    if (!photo && photo === 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
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
      <CustomButton type="button" disabled={isValid} handleClick={pickImage}>
        Upload a profile image
      </CustomButton>
    </div>
  );
};

export default ImageUpload;
