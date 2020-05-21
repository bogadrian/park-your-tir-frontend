import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';
import { selectUser } from '../../../redux/userReducer/user-selector';
import './author-name.scss';

import MessageOn from '../../../images/message-on.svg';
import MessageOff from '../../../images/message-off.svg';

const AuthorName = ({ place, currentUser }) => {
  const url = process.env.REACT_APP_URLC;
  const [checked, setChecked] = useState(true);

  let reciverEmail, reciver;
  if (
    place &&
    place.placeAuthor &&
    place.placeAuthor.email &&
    place.placeAuthor.name
  ) {
    reciverEmail = place.placeAuthor.email;
    reciver = place.placeAuthor.name;
  }

  let myEmail, myName;
  if (
    currentUser &&
    currentUser.data &&
    currentUser.data.user &&
    currentUser.data.user.email
  ) {
    myEmail = currentUser.data.user.email;
    myName = currentUser.data.user.name;
  }

  if (
    currentUser &&
    currentUser.data &&
    currentUser.data.user &&
    currentUser.data.user.name
  ) {
    myName = currentUser.data.user.name;
  }

  let enabled;
  if (
    currentUser &&
    currentUser.data &&
    currentUser.data.user &&
    currentUser.data.user.enabled
  ) {
    enabled = currentUser.data.user.enabled;
  }

  let isMe = false;
  if (myEmail === reciverEmail) {
    isMe = true;
  }

  useEffect(() => {
    setChecked(enabled);
  }, [enabled]);

  return (
    <div>
      {place.placeAuthor ? (
        <div className="place-author-container">
          <div>
            <h2 style={{ color: '#1c9aae' }}>{place.placeAuthor.name}</h2>
            {checked ? (
              <span>
                {isMe && <h2 style={{ color: 'green' }}>Messages On</h2>}
                {!isMe && <h2>Send Message</h2>}
                {!isMe && (
                  <a
                    href={`http://localhost:3000/chat?name=${myName}&reciver=${reciver}&myEmail=${myEmail}&reciverEmail=${reciverEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={MessageOn} alt="message on" />
                  </a>
                )}
              </span>
            ) : (
              <span>
                <h2 style={{ color: 'red' }}>Messages Off</h2>

                <p>
                  You or the person you try to write may have Messanger turned
                  off
                </p>
                {isMe ? (
                  <Link to="/my-profile">
                    <img src={MessageOff} alt="message off" />
                  </Link>
                ) : (
                  <img src={MessageOff} alt="message off" />
                )}
              </span>
            )}

            <img
              className="place-author-image"
              src={`${url}/api/v1/img/users/${currentUser.data.user.photo}`}
              alt={place.placeAuthor.name}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem,
  currentUser: selectUser
});

export default connect(mapStateToProps)(AuthorName);
