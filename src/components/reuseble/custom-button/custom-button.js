import React from 'react';

import './custom-button.scss';

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <button
      className={`${otherProps.disabled ? 'disabled' : ''} custom-button`}
      onClick={otherProps.handleClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
