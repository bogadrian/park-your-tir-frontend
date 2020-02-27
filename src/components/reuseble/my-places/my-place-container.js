import React from 'react';
import { useHistory } from 'react-router-dom';

import './my-places-container.scss';

const MyPlacesContainer = ({ posts }) => {
  let history = useHistory();

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
            {console.log(post.name)}
            <div>
              <img
                className="img-place-tag"
                src={`http://127.0.0.1:3000/api/v1/img/places/${post.images[0]}`}
                alt="place"
              />{' '}
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default MyPlacesContainer;
