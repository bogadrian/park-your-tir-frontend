import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';
import Rater from 'react-rater';

import './star-rate.scss';

const StarRate = ({ place }) => {
  console.log(place.ratingsAverage);
  return (
    <div>
      <Rater
        className="react-rater-star react-rater"
        total={6}
        rating={place.ratingsAverage}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

export default connect(mapStateToProps)(StarRate);
