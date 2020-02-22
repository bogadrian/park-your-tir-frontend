import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import StarRatings from 'react-star-ratings';
import FormInput from '../reuseble/input-form/input-form';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { VALIDATOR_MINLENGTH } from '../../utils/validators';

import { startComment } from '../../redux/setComment/setComment-actions';

import './comment.scss';

const Comment = ({ startComment, ...props }) => {
  const [rating, setRating] = useState(0);
  const [commentValue, setCommentValue] = useState(null);

  const handleInput = useCallback((id, value, isValid) => {
    console.log(value);
    setCommentValue(value);
  }, []);

  const changeRating = newRating => {
    setRating(newRating);
  };

  const id = props.id;
  const data = { id, commentValue, rating };

  const handleComment = () => {
    startComment(data);
    window.location.reload();
  };

  return (
    <div>
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
      <CustomButton handleClick={handleComment}>Comment</CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startComment: data => dispatch(startComment(data))
});

export default connect(null, mapDispatchToProps)(Comment);
