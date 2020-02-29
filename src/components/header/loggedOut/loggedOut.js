import React from 'react';

import { Link } from 'react-router-dom';

import './loggedOut.scss';

const LoggedOut = () => {
  return (
    <div>
      <div className="loggedOut-container">
        <Link className="link-login" to="/signin">
          LOG IN
        </Link>
        <p>/</p>
        <Link className="link-login" to="/signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default LoggedOut;
