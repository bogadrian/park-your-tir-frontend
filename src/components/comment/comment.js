import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import StarRatings from 'react-star-ratings';
import FormInput from '../reuseble/input-form/input-form';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { VALIDATOR_MINLENGTH } from '../../utils/validators';
import Modal from '../reuseble/modal/modal';
import { startComment } from '../../redux/setComment/setComment-actions';

import './comment.scss';

const Comment = ({ startComment, ...props }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [commentValue, setCommentValue] = useState(null);
  const [valid, setValid] = useState(false);

  const handleInput = useCallback((id, value, isValid) => {
    setValid(!isValid);
    setCommentValue(value);
  }, []);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const id = props.id;

  const data = { id, commentValue, rating };
  console.log(data);

  const handleComment = () => {
    startComment(data);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  return (
    <div className="comment-container">
      <Modal
        show={show}
        header="Comment"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleClose}>CLOSE</CustomButton>}
      >
        The comment was posted!
      </Modal>
      <div>
        <FormInput
          id="input"
          element="input"
          label="comment"
          texterror="Please write a comment"
          validators={[VALIDATOR_MINLENGTH(2)]}
          onInput={handleInput}
          required={true}
        />
      </div>
      <div>
        <h3>Please Rate This Place!</h3>
      </div>
      <div className="star-rating">
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          changeRating={changeRating}
          numberOfStars={6}
          name="rating"
          starDimension="20px"
          starSpacing="10px"
        />
      </div>
      <div className="button-comment-container">
        <CustomButton handleClick={handleComment} disabled={valid}>
          Comment
        </CustomButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startComment: data => dispatch(startComment(data))
});

export default connect(null, mapDispatchToProps)(Comment);
