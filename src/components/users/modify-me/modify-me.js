import React, { useReducer, useCallback, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FormInput from '../../reuseble/input-form/input-form';
import CustomButton from '../../reuseble/custom-button/custom-button';
import {
  selectUser,
  selectError
} from '../../../redux/userReducer/user-selector';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../../utils/validators';
import {
  clearErorr,
  uploadStart
} from '../../../redux/userReducer/user-actions';
import Modal from '../../reuseble/modal/modal';
import ImageUpload from '../../reuseble/ImageUpload/image-upload';
import SwitchComponent from '../../reuseble/switch/switch';

import './modify-me.scss';
const urlActual = process.env.REACT_APP_URL;

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const input in state.inputs) {
        if (input === action.inputId) {
          formIsValid = formIsValid && action.valid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.valid }
        },
        genValid: formIsValid
      };
    default:
      return state;
  }
};

const ModifyMe = ({ clearErorr, error, uploadStart, currentUser }) => {
  const [photo, setPhoto] = useState(null);

  const handleError = () => {
    clearErorr();
  };

  let show;
  let mes;
  if (error !== null) {
    show = true;
    mes =
      'Please check your password ( must be the same), the email (must be unique and not allready registred); then please try again!';
  } else {
    show = false;
  }
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      genValid: false
    }
  });

  const handleInput = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      valid: isValid,
      inputId: id
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    let name = formState.inputs.name.value;
    let email = formState.inputs.email.value;

    uploadStart(
      photo ? photo : currentUser.data.user.photo,
      email ? email : currentUser.data.user.email,
      name ? name : currentUser.data.user.name
    );
  };

  const fileHandler = photo => {
    setPhoto(photo);
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        header="There as an error signin-up!"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleError}>CLOSE</CustomButton>}
      >
        {mes}
      </Modal>
      <div className="sign-up">
        <form onSubmit={handleSubmit}>
          <img
            className="photo-profile-main"
            src={`${urlActual}/api/v1/img/users/${currentUser.data.user.photo}`}
            alt={currentUser.data.user.name}
          />
          <ImageUpload onInput={fileHandler} />

          <h2 style={{ color: '#1B9AAD' }}>{currentUser.data.user.name}</h2>
          <p style={{ fontWeight: 'bold' }}>Change name:</p>
          <FormInput
            id="name"
            element="input"
            texterror="Please enter a name from at least 3 characters"
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInput={handleInput}
            label="Display Name"
            required
          />
          <h2 style={{ color: '#1B9AAD' }}>{currentUser.data.user.email}</h2>
          <p style={{ fontWeight: 'bold' }}>Change email:</p>
          <FormInput
            id="email"
            element="input"
            label="email"
            texterror="Please enter a valid email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={handleInput}
            required
          />
          <p>Allow Messages</p>
          <SwitchComponent />

          <CustomButton type="submit" disabled={formState.genValid}>
            Update Profile
          </CustomButton>
        </form>
        <div style={{ marginTop: '20px' }}>
          <Link to="/password-resset">
            <h4>Password Forgotten?</h4>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  clearErorr: () => dispatch(clearErorr()),
  uploadStart: (photo, email, name, token) =>
    dispatch(uploadStart({ photo, email, name }))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModifyMe)
);
