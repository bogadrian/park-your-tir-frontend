import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../reuseble/input-form/input-form';
import CustomButton from '../reuseble/custom-button/custom-button';
import { VALIDATOR_EMAIL } from '../../utils/validators';
import { startResset } from '../../redux/ressetPassword/ressetPassword-actions';
import Modal from '../../components/reuseble/modal/modal';

import './passwordResset.scss';

const PasswordResset = ({ startResset, ...props }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [valid, setValid] = useState(false);

  const handleModal = () => {
    setShow(false);
  };

  const [email, setEmail] = useState(null);
  const handleInput = useCallback((id, value, isValid) => {
    setValid(!isValid);
    setEmail(value);
  }, []);

  const handleEmailResset = () => {
    startResset(email);

    setShow(true);
    setMessage(
      'If the email exists in our database, you will recive a link for reset password!'
    );
  };
  return (
    <div className="resset-password-container">
      <h1>Password resset</h1>{' '}
      <Modal
        show={show}
        header="Pasword Reset!"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleModal}>CLOSE</CustomButton>}
      >
        {message}
      </Modal>
      <FormInput
        id="email"
        element="input"
        label="email"
        validators={[VALIDATOR_EMAIL()]}
        texterror="Please enter a valid email address"
        onInput={handleInput}
        required={true}
      />
      <CustomButton handleClick={handleEmailResset} disabled={valid}>
        Resset Password
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startResset: email => dispatch(startResset(email))
});
export default connect(null, mapDispatchToProps)(PasswordResset);
