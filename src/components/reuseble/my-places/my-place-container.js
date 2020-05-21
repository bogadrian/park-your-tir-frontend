import React from 'react';
import { useHistory } from 'react-router-dom';

import './my-places-container.scss';

const MyPlacesContainer = ({ posts }) => {
  let history = useHistory();
  const url = process.env.REACT_APP_URLC;

  const handleClick = ({ post }) => {
    history.push(`/place/${post.id}`);
  };

  return (
    <ul>
      {posts.map(post => (
        <div key={post._id} className="my-places-container">
          <li onClick={() => handleClick({ post })}>
            <div>
              <h3>{post.name}</h3>
            </div>
            <div>
              <img
                className="img-place-tag"
                src={`${url}/api/v1/img/places/${post.images[0]}`}
                alt="place"
              />
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default MyPlacesContainer;
