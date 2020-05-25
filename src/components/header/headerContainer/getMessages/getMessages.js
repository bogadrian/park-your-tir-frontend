import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { get } from 'lodash';
import { selectUser } from '../../../../redux/userReducer/user-selector';
import './getMessages.scss';

const GetMessages = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [messagesFilt, setMessagesFilt] = useState([]);
  const myEmail = get(currentUser, ['data', 'user', 'email']);
  const enabled = get(currentUser, ['data', 'user', 'enabled']);

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

  let read = messagesFilt.filter((el, i) => el.read === false);

  useEffect(() => {
    let clean = true;
    if (clean) {
      let fetchMessages = async () => {
        const mes = await axios.get(
          `https://messanger-back.herokuapp.com/messages/${myEmail}`
        );

        setMessages([...mes.data.data]);
      };
      fetchMessages();
    }
    return () => {
      clean = false;
    };
  }, [myEmail]);

  return (
    <div>
      {enabled && (
        <div>
          <a
            href={`https://pyt-messanger.netlify.app/?token=${localStorage.getItem(
              'jwt'
            )}&enabled=true&myEmail=${myEmail}`}
          >
            <div className="messages-container">
              <div className="messages">
                <span className="messages-num">{read.length}</span>
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
