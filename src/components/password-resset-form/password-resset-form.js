import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import FormInput from '../reuseble/input-form/input-form';
import CustomButton from '../reuseble/custom-button/custom-button';
import { VALIDATOR_MINLENGTH } from '../../utils/validators';
import { passwordRessetStart } from '../../redux/passwordResset/passwordResset-actions';
import { signOutStart } from '../../redux//userReducer/user-actions';
import { passwordRessetSelector } from '../../redux/passwordResset/passwordResset-selector';
import './password-resset-form.scss';

const FormRessetPassword = ({
  passwordRessetStart,

  signOutStart,
  pass
}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [genValid, setGenValid] = useState(false);

  const history = useHistory();

  if (pass.status === 'success') {
    signOutStart();
    history.push('/');
  }
  const token = useParams().token;

  const handleInput = useCallback((id, value, isValid) => {
    setPassword(value);
    setPasswordConfirm(value);
    setGenValid(isValid);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    passwordRessetStart({
      password,
      passwordConfirm,
      token
    });
  };
  return (
    <div className="password-resset-container">
      <form onSubmit={handleSubmit}>
        <FormInput
          id="password"
          element="input"
          label="New Password"
          texterror="Please enter a password wit at least 8 characters"
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInput={handleInput}
          required={true}
        />
        <FormInput
          id="text"
          element="input"
          label="Repeat Password"
          texterror="Passwords must be the same"
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInput={handleInput}
          required={true}
        />
        <div className="button-comment-container">
          <CustomButton type="submit" disabled={!genValid}>
            Reset Password
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  pass: passwordRessetSelector
});

const mapDispatchToProps = dispatch => ({
  passwordRessetStart: data => dispatch(passwordRessetStart(data)),
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(FormRessetPassword);
