import React, { useReducer, useCallback } from 'react';

import { connect } from 'react-redux';

import FormInput from '../../components/reuseble/input-form/input-form';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';
import { signUpStart, clearErorr } from '../../redux/userReducer/user-actions';
import Modal from '../../components/reuseble/modal/modal';

import './sign-up.scss';

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
const SignUp = ({ signUpStart, clearErorr, error }) => {
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
      password: {
        value: '',
        isValid: false
      },
      confirmPassword: {
        value: '',
        isValid: false
      }
    },
    genValid: false
  });

  const handleInput = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      valid: isValid,
      inputId: id
    });
  }, []);

  const checkPasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (checkPasswords() === true) {
      const newUser = {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
        passwordConfirm: formState.inputs.confirmPassword.value
      };
      try {
        signUpStart(newUser);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Psswords are not the same');
    }
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
          <FormInput
            id="name"
            element="input"
            texterror="Please enter a name from at least 3 characters"
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInput={handleInput}
            label="Display Name"
            required
          />

          <FormInput
            id="email"
            element="input"
            label="email"
            texterror="Please enter a valid email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={handleInput}
            required
          />

          <FormInput
            id="password"
            element="input"
            label="password"
            texterror="Please enter a password at least from 6 characters"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={handleInput}
            required
          />

          <FormInput
            id="confirmPassword"
            element="input"
            texterror="Please enter the same password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={handleInput}
            label="Confirm Password"
            required
          />

          <CustomButton type="submit" disabled={!formState.genValid}>
            Sign Up
          </CustomButton>
        </form>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = ({ user }) => ({
  error: user.error
});
const mapDispatchToProps = dispatch => ({
  signUpStart: user => dispatch(signUpStart(user)),
  clearErorr: () => dispatch(clearErorr())
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
