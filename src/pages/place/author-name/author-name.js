import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';

import './author-name.scss';

const AuthorName = ({ place }) => {
  return (
    <div>
      {place.placeAuthor ? (
        <div className="place-author-container">
          <div>
            <h2>{place.placeAuthor.name}</h2>
          </div>
          <div>
            <img
              className="place-author-image"
              src={`http://127.0.0.1:3000/api/v1/img/users/${place.placeAuthor.photo}`}
              alt={place.placeAuthor.name}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

export default connect(mapStateToProps)(AuthorName);
