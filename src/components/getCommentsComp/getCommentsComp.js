import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCommentsStart } from '../../redux/getComments/getComments-actions';
import Rater from 'react-rater';
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

export const mapStateToProps = ({ comments }) => ({
  comments
});

export const mapDispatchToProps = dispatch => ({
  getCommentsStart: placeId => dispatch(getCommentsStart(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComp);
