import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormInput from '../../reuseble/input-form/input-form';
import { VALIDATOR_MINLENGTH } from '../../../utils/validators';

import {
  setNameStart,
  setDescStart
} from '../../../redux/coordsReducer/coords-action';
import './place-data.scss';

const PlaceDataName = ({ setNameStart, setDescStart, ...props }) => {
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    setNameStart(name);
    setDescStart(desc);
  }, [setNameStart, setDescStart, desc, name]);

  const handleInput = (id, value, isValid) => {
    setName(value);
    setDesc(value);
  };
  return (
    <div className="container">
      <h1>place data here title description images ratingsAverage coords</h1>
      <div className="inputs">
        <FormInput
          id="name"
          element="input"
          texterror="Please enter a tilte for this place"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInput={handleInput}
          label="Title"
          required
        />
        <FormInput
          id="name"
          element="input"
          texterror="Please enter a description for this place"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInput={handleInput}
          label="Place Description"
          rows={3}
          required
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setNameStart: name => dispatch(setNameStart(name)),
  setDescStart: desc => dispatch(setDescStart(desc))
});
export default connect(null, mapDispatchToProps)(PlaceDataName);
