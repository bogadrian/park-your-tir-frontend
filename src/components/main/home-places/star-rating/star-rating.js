import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import StarRatings from 'react-star-ratings';
import CustomButton from '../../../reuseble/custom-button/custom-button';
import { ratingStart } from '../../../../redux/coordsReducer/coords-action';
import { startCreate } from '../../../../redux/setPlace/setPlace-action';
import Modal from '../../../reuseble/modal/modal';

import './star-rating.scss';

const StarRating = ({
  place,
  startCreate,
  ratingStart,
  error,
  history,
  ...props
}) => {
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
    history.push('/');
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
        {error
          ? 'The place coud not be created. Please check and try again!'
          : 'The Place was created!'}
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
        <CustomButton handleClick={handleClick}>Create</CustomButton>
      </div>
    </Fragment>
  );
};
const mapStateToProps = ({ coords, places: { error } }) => ({
  place: coords,
  error
});

const mapDispatchToProps = dispatch => ({
  ratingStart: rating => dispatch(ratingStart(rating)),
  startCreate: place => dispatch(startCreate(place))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StarRating)
);
