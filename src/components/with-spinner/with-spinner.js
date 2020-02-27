import React from 'react';
import Spinner from '../spinner/spinner';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  console.log(isLoading);
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
