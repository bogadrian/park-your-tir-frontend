import React from 'react';
import { useHistory } from 'react-router-dom';
import './my-places-item.scss';

const MyPlacesItem = props => {
  let history = useHistory();
  const place = props.place;

  const handleClick = ({ place }) => {
    history.push(`/place/${place.id}`);
  };

  return (
    <div key={place.id}>
      <ul>
        <li onClick={() => handleClick({ place })}>
          <h3>{place.name}</h3>
          <img
            className="img-place-tag"
            src={`http://127.0.0.1:3000/api/v1/img/places/${place.images[0]}`}
            alt="place"
          />
        </li>
      </ul>
    </div>
  );
};

export default MyPlacesItem;
