import React, { useCallback, useReducer } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../utils/validators';

import FormInput from '../../components/reuseble/input-form/input-form';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { signInStart, clearErorr } from '../../redux/userReducer/user-actions';
import Modal from '../../components/reuseble/modal/modal';
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
    case 'RESET_INPUT':
      return {
        ...state,
        inputs: '',
        genValid: false
      };
    default:
      return state;
  }
};

const SignIn = ({ history, signInStart, error, clearErorr }) => {
  let show = false;
  let message;
  if (error) {
    show = true;
    message = 'Please check your password and email and try again!';
  } else {
    show = false;
  }

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

    let newUser = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value
    };

    if (newUser) {
      signInStart(newUser);
    }
  };

  const handleError = () => {
    clearErorr();
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        header="There as an error login-in!"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleError}>CLOSE</CustomButton>}
      >
        {message}
      </Modal>

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
          <CustomButton
            type="click"
            handleClick={() => history.push(`/signup`)}
          >
            Go to Sign Up
          </CustomButton>
        </div>
        <div>
          <Link to="/password-resset">
            <h3>Password forgotten?</h3>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = ({ user }) => ({
  error: user.error
});
const mapDispatchToProps = dispatch => ({
  signInStart: user => dispatch(signInStart(user)),
  clearErorr: () => dispatch(clearErorr())
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
