import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getCommentsStart } from '../../redux/getComments/getComments-actions';
import Rater from 'react-rater';
import Modal from '../reuseble/modal/modal';
import CustomButton from '../reuseble/custom-button/custom-button';
import { selectComments } from '../../redux/getComments/getComments-selector';
import { selectComment } from '../../redux/setComment/setComment-selector';
import { selectUser } from '../../redux/userReducer/user-selector';
import selectMe from '../../redux/getMe/getMe-reducer';

import { get } from 'lodash';
import {
  startUpdateComment,
  startDeleteComment
} from '../../redux/updateDeleteCommentReducer/updateDeleteComment-actions';
import './getCommentsComp.scss';

const CommentsComp = ({
  comments,
  comment,
  me,
  user,
  getCommentsStart,
  startUpdateComment,
  startDeleteComment,

  ...props
}) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  let [dis, setDisabled] = useState(true);
  const [text, setText] = useState(null);
  const placeId = useParams().placeId;

  const commentMeId = get(me, ['user', 'currentUser', 'data', 'user', '_id']);
  const com = get(comments, ['data']);

  useEffect(() => {
    getCommentsStart(props.placeId);
  }, [getCommentsStart, props.placeId, comment]);

  const handleClose = () => {
    setShow(false);
    getCommentsStart(props.placeId);
    setDisabled(true);
  };

  const handleChangeText = e => {
    if (e.target.value) {
      setText(e.target.value);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        header="Comment"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton handleClick={handleClose}>CLOSE</CustomButton>}
      >
        {message}
      </Modal>
      {com
        ? com.map(co => (
            <ul key={co._id}>
              {co.place === props.placeId ? (
                <li className="li-element">
                  <h3 className="li-element">
                    <textarea
                      className={`${dis ? 'is-shown' : 'is-hidden'}`}
                      row="50"
                      cols="50"
                      name="comment"
                      disabled={dis}
                      defaultValue={co.comment}
                      onChange={handleChangeText}
                      autoFocus
                    />
                  </h3>

                  <h3 style={{ color: '#1c9aae' }}>{co.author.name}</h3>
                  <p>Comment author Rating for this place</p>

                  <Rater
                    className="react-rater-star-comp react-rater-comp"
                    interactive={false}
                    total={6}
                    rating={co.rating}
                  />
                  {me ? (
                    <div className="delete-update-comment">
                      {commentMeId === co.author._id ? (
                        <span
                          className="update-comment"
                          onClick={e => {
                            const commentId = co._id;
                            const data = { commentId, placeId, text };

                            if (text) {
                              startUpdateComment(data);
                              setShow(true);
                            }

                            setDisabled(false);
                            setMessage('The comment was updated!');
                          }}
                        >
                          Update Comment
                        </span>
                      ) : null}
                      {commentMeId === co.author.id ? (
                        <span
                          className="delete-comment"
                          onClick={() => {
                            const commentId = co._id;
                            const data = { commentId, placeId };
                            setShow(true);
                            setMessage(
                              'The comment was deleted. Refresh the page to no longer see it!'
                            );
                            startDeleteComment(data);
                          }}
                        >
                          Delete Comment
                        </span>
                      ) : null}
                    </div>
                  ) : null}
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
  comment: selectComment,
  user: selectUser,
  me: selectMe
});

export const mapDispatchToProps = dispatch => ({
  getCommentsStart: placeId => dispatch(getCommentsStart(placeId)),
  startUpdateComment: data => dispatch(startUpdateComment(data)),
  startDeleteComment: data => dispatch(startDeleteComment(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsComp);
