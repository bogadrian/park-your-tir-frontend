import React, { useState, useEffect, useCallback } from 'react';
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

  const handleName = useCallback((id, value) => {
    setName(value);
  }, []);

  const handleDesc = useCallback((id, value) => {
    setDesc(value);
  }, []);

  return (
    <div className="container">
      <div className="inputs">
        <h2>{props.name}</h2>
        <FormInput
          id="name"
          element="input"
          texterror="Please enter a tilte for this place"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInput={handleName}
          label="Title"
          required
        />
        <h2>{props.desc}</h2>
        <FormInput
          id="text"
          element="input"
          texterror="Please enter a description for this place"
          validators={[VALIDATOR_MINLENGTH(3)]}
          onInput={handleDesc}
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
