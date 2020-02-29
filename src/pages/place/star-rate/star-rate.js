import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';
import Rater from 'react-rater';

import './star-rate.scss';

const StarRate = ({ place }) => {
  return (
    <div>
      <Rater
        className="react-rater-star react-rater"
        interactive={false}
        total={6}
        rating={place.ratingsAverage}
      />
      <div>
        <h3>Number of votes: {place.ratingsQuantity}</h3>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

export default connect(mapStateToProps)(StarRate);
