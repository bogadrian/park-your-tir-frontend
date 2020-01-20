import React, { useReducer, useCallback } from 'react';

import { connect } from 'react-redux';

import FormInput from '../../components/input-form/input-form';
import CustomButton from '../../components/custom-button/custom-button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';
import { signUpStart } from '../../redux/userReducer/user-actions';

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
const SignUp = ({ signUpStart }) => {
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
  );
};
const mapDispatchToProps = dispatch => ({
  signUpStart: user => dispatch(signUpStart(user))
});
export default connect(null, mapDispatchToProps)(SignUp);
