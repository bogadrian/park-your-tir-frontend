import React from 'react';

import './not-found.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-number">404</div>
      <h1>
        The Page you are looking for does not exist on this site! Please check
        the url and try agian!
      </h1>
    </div>
  );
};

export default NotFound;
