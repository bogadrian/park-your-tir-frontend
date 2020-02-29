import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';

import './author-name.scss';
const urlActual = 'https://bogdan-park-your-tir.herokuapp.com';

const AuthorName = ({ place }) => {
  return (
    <div>
      {place.placeAuthor ? (
        <div className="place-author-container">
          <div>
            <h2 style={{ color: '#1c9aae' }}>{place.placeAuthor.name}</h2>

            <img
              className="place-author-image"
              src={`${urlActual}/api/v1/img/users/${place.placeAuthor.photo}`}
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
