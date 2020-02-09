import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import CustomButton from '../../../reuseble/custom-button/custom-button';
import { ratingStart } from '../../../../redux/coordsReducer/coords-action';
import { startCreate } from '../../../../redux/setPlace/setPlace-action';

import './star-rating.scss';

const StarRating = ({ place, startCreate, ratingStart, ...props }) => {
  const [rating, setRating] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const handleClick = () => {
    startCreate(place);
    setRedirect(true);
  };

  useEffect(() => {
    ratingStart(rating);
  }, [rating, ratingStart]);

  return (
    <Fragment>
      <div className="star-rating">
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="40px"
          starSpacing="15px"
        />
      </div>
      <div className="button">
        <CustomButton handleClick={handleClick}>Create Place</CustomButton>
        {redirect ? <Redirect to="/my-profile" /> : null}
      </div>
    </Fragment>
  );
};
const mapStateToProps = ({ coords }) => ({
  place: coords
});

const mapDispatchToProps = dispatch => ({
  ratingStart: rating => dispatch(ratingStart(rating)),
  startCreate: place => dispatch(startCreate(place))
});
export default connect(mapStateToProps, mapDispatchToProps)(StarRating);
