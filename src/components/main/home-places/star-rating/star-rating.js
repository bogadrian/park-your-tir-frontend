import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import StarRatings from 'react-star-ratings';
import CustomButton from '../../../reuseble/custom-button/custom-button';
import { ratingStart } from '../../../../redux/coordsReducer/coords-action';
import { startCreate } from '../../../../redux/setPlace/setPlace-action';
import Modal from '../../../reuseble/modal/modal';

import './star-rating.scss';

const StarRating = ({ place, startCreate, ratingStart, ...props }) => {
  const [rating, setRating] = useState(0);

  const [show, setShow] = useState(false);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const handleClick = () => {
    startCreate(place);

    setShow(true);
  };

  useEffect(() => {
    ratingStart(rating);
  }, [rating, ratingStart]);

  const handleError = () => {
    setShow(false);
  };
  return (
    <Fragment>
      <Modal
        show={show}
        header="Place Updated"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleError}>CLOSE</CustomButton>}
      >
        "The Place was updated!"
      </Modal>
      <div className="star-rating">
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={6}
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
const mapStateToProps = ({ coords }) => ({
  place: coords
});

const mapDispatchToProps = dispatch => ({
  ratingStart: rating => dispatch(ratingStart(rating)),
  startCreate: place => dispatch(startCreate(place))
});
export default connect(mapStateToProps, mapDispatchToProps)(StarRating);
