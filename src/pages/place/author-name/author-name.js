import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';
import { selectUser } from '../../../redux/userReducer/user-selector';
import './author-name.scss';

import MessageOn from '../../../images/message-on.svg';
import MessageOff from '../../../images/message-off.svg';
const url = process.env.REACT_APP_URLC;

const AuthorName = ({ place, currentUser }) => {
  const [checked, setChecked] = useState(true);

  let reciverEmail, reciver, photo;
  if (
    place &&
    place.placeAuthor &&
    place.placeAuthor.email &&
    place.placeAuthor.name &&
    place.placeAuthor.photo
  ) {
    reciverEmail = place.placeAuthor.email;
    reciver = place.placeAuthor.name;
    photo = place.placeAuthor.photo;
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
      <div>
        {place.placeAuthor ? (
          <div className="place-author-container">
            <div>
              {checked ? (
                <span>
                  {isMe && <h2 style={{ color: 'green' }}>Messages On</h2>}
                  {!isMe && <h2>Send Message</h2>}
                  {!isMe && (
                    <a
                      href={`https://pyt-messanger.netlify.app/chat?name=${
                        myName.split(' ')[0]
                      }&reciver=${
                        reciver.split(' ')[0]
                      }&myEmail=${myEmail}&reciverEmail=${reciverEmail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="place-author-image"
                        src={MessageOn}
                        alt="message on"
                      />
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
                      <img
                        className="place-author-image"
                        src={MessageOff}
                        alt="message off"
                      />
                    </Link>
                  ) : (
                    <img
                      className="place-author-image"
                      src={MessageOff}
                      alt="message off"
                    />
                  )}
                </span>
              )}
              <div>
                <h2 style={{ color: '#1c9aae' }}>{place.placeAuthor.name}</h2>
                <img
                  className="place-author-image"
                  src={`${url}/api/v1/img/users/${photo}`}
                  alt={place.placeAuthor.name}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem,
  currentUser: selectUser
});

export default connect(mapStateToProps)(AuthorName);
