import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { getCommentsStart } from '../../redux/getComments/getComments-actions';
import Rater from 'react-rater';

import { selectComments } from '../../redux/getComments/getComments-selector';
import { selectComment } from '../../redux/setComment/setComment-selector';
import './getCommentsComp.scss';

const CommentsComp = ({ comments, getCommentsStart, ...props }) => {
  let com;
  if (comments.comments) {
    com = comments.comments.data;
  }

  useEffect(() => {
    getCommentsStart(props.placeId);
  }, [getCommentsStart, props.placeId]);

  return (
    <div>
      {com
        ? com.map(comment => (
            <ul key={comment._id}>
              {comment.place === props.placeId ? (
                <li>
                  <h3>{comment.comment}</h3>
                  <h3 style={{ color: '#1c9aae' }}>{comment.author.name}</h3>
                  <p>Comment author Rating for this place</p>
                  <Rater
                    className="react-rater-star-comp react-rater-comp"
                    interactive={false}
                    total={6}
                    rating={comment.rating}
                  />
                </li>
              ) : null}
            </ul>
          ))
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  comments: selectComments,
  comment: selectComment
});
export const mapDispatchToProps = dispatch => ({
  getCommentsStart: placeId => dispatch(getCommentsStart(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComp);
