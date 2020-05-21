import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './switch.scss';
import { changeEnabled } from '../../../redux/userReducer/user-actions';
import {
  selectUser,
  selectError
} from '../../../redux/userReducer/user-selector';

const SwitchComponent = ({ changeEnabled, currentUser }) => {
  const [checked, setChecked] = useState(false);
  const [myEmail, setMyEmail] = useState('');

  useEffect(() => {
    setChecked(currentUser.data.user.enabled);
    setMyEmail(currentUser.data.user.email);
  }, [currentUser.data.user.enabled, currentUser.data.user.email]);

  const handleChange = checked => {
    setChecked(checked);
    if (checked) {
      const jwt = localStorage.getItem('jwt');
      // eslint-disable-next-line no-restricted-globals
      window.open(
        `http://localhost:3000/?token=${jwt}&enabled=true%myEmail=${myEmail}`
      );
    } else {
      // eslint-disable-next-line no-restricted-globals
      window.open('http://localhost:3000/?token=null&enabled=false');
    }
    changeEnabled(checked);
  };

  return (
    <div className="example">
      <h2>
        {checked === true ? (
          <p style={{ color: 'green' }}>Messages On</p>
        ) : (
          <p style={{ color: 'red' }}>Messages Off</p>
        )}
      </h2>
      <label htmlFor="material-switch">
        <Switch
          checked={checked}
          onChange={handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={40}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={30}
          width={68}
          className="react-switch"
          id="material-switch"
        />
      </label>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectUser,
  error: selectError
});

const mapDispatchToProps = dispatch => ({
  changeEnabled: checked => dispatch(changeEnabled(checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchComponent);
