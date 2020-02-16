import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../redux/fetchPlace/fetchPlace-selector';

import PlaceIframe from './place-iframe/place-iframe';
import AuthorName from './author-name/author-name';
import UpdateDeletePlace from './update-place/update-place';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import StarRate from './star-rate/star-rate';

import './place.scss';

const Place = ({ place }) => {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <div className="place-container">
      <div className="google-map-container">
        <div className="place-name">
          <h2 style={{ textAlign: 'center' }}>{place.name}</h2>
          <CustomButton handleClick={handleClick}>Take me There</CustomButton>
        </div>
      </div>
      <div>
        <PlaceIframe />
      </div>
      <div>
        <h2>Place Rataing Average</h2>
        <StarRate />
      </div>
      <div className="author-container">
        <p>Author name</p>
        <AuthorName />
      </div>
      <div>
        <UpdateDeletePlace />
      </div>

      <div>
        <p>{place.description}</p>
      </div>

      <div>
        <h3>comments</h3>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

export default connect(mapStateToProps)(Place);
