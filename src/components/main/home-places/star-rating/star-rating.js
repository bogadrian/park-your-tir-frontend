import React, { useState, Fragment } from 'react';
import StarRatings from 'react-star-ratings';
import CustomButton from '../../../reuseble/custom-button/custom-button';

import './star-rating.scss';

const StarRating = props => {
  const [rating, setRating] = useState(0);
  console.log(rating);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const handleClick = () => {
    console.log('clicked');
  };
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
      </div>
    </Fragment>
  );
};

export default StarRating;
