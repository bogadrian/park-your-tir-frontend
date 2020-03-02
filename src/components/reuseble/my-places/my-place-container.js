import React from 'react';
import { useHistory } from 'react-router-dom';

import './my-places-container.scss';
<<<<<<< HEAD
const urlActual = 'https://bogdan-park-your-tir.herokuapp.com';
=======
const urlActual = process.env.REACT_APP_URL;
>>>>>>> e3bf618ba77097a4282bf7963105be515ce5de7b

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
            <div>
              <img
                className="img-place-tag"
                src={`${urlActual}/api/v1/img/places/${post.images[0]}`}
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
