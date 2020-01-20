import React, { useCallback, useReducer } from 'react';

import { connect } from 'react-redux';

import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';

import FormInput from '../../components/input-form/input-form';
import CustomButton from '../../components/custom-button/custom-button';
import { signInStart } from '../../redux/userReducer/user-actions';

import './sign-in.scss';

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

const SignIn = ({ history, signInStart }) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: '',
        isValid: false
      },
      password: {
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

  const handleSubmit = async e => {
    e.preventDefault();
    const newUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    };

    signInStart(newUser);
  };

  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          element="input"
          label="email"
          texterror="Please enter a valid email"
          validators={[VALIDATOR_EMAIL()]}
          onInput={handleInput}
          required={true}
        />

        <FormInput
          id="password"
          element="input"
          label="password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          texterror="Password must be minum 6 characters"
          onInput={handleInput}
          required={true}
        />

        <CustomButton type="submit" disabled={!formState.genValid}>
          Sign In
        </CustomButton>
      </form>
      <div>
        <h2>
          You don't have an account? Please signup! It takes only 1 minute!
        </h2>
        <CustomButton type="click" handleClick={() => history.push(`/signup`)}>
          Go to Sign Up
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signInStart: user => dispatch(signInStart(user))
});
export default connect(null, mapDispatchToProps)(SignIn);
