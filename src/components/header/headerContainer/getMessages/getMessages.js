import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { selectUser } from '../../../../redux/userReducer/user-selector';
import './getMessages.scss';

const GetMessages = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [messagesFilt, setMessagesFilt] = useState([]);

  useEffect(() => {
    let messagesFiltred = [];
    let obj = {};

    for (let i in messages) {
      const objProp = messages[i]['name'];

      obj[objProp] = messages[i];
    }
    for (let i in obj) {
      messagesFiltred.push(obj[i]);
    }

    setMessagesFilt([...messagesFiltred]);
  }, [messages]);

  let reciverEmail;

  if (messages && messages.length > 0) {
    messages.forEach(el => {
      reciverEmail = el.reciverEmail;
    });
  }

  let myEmail, enabled;
  if (
    currentUser &&
    currentUser.data &&
    currentUser.data.user &&
    currentUser.data.user.email
  ) {
    myEmail = currentUser.data.user.email;
  }
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

  let read = messagesFilt.filter(el => el.read === false);

  console.log(read.length);

  useEffect(() => {
    let clean = true;
    if (clean) {
      let fetchMessages = async () => {
        const mes = await axios.get(
          `http://localhost:5002/messages/${myEmail}`
        );
        console.log(mes.data.data);
        setMessages([...mes.data.data]);
      };
      fetchMessages();
    }
    return () => {
      clean = false;
    };
  }, []);

  return (
    <div>
      {enabled && (
        <div>
          <a
            href={`http://localhost:3000/?token=${localStorage.getItem(
              'jwt'
            )}&enabled=true&myEmail=${myEmail}`}
          >
            <div className="messages-container">
              <div className="messages">
                <span className="messages-num">{read.length}</span>{' '}
                <span className="messages-text">M</span>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectUser
});

export default connect(mapStateToProps)(GetMessages);
