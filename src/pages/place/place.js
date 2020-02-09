import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { startFetch } from '../../redux/fetchPlace/fetchPlace-action';
import { selectPlaceItem } from '../../redux/fetchPlace/fetchPlace-selector';

import './place.scss';

const Place = ({ startFetch, place, ...props }) => {
  const placeId = useParams().placeId;
  let lat;
  let lng;
  try {
    [lat, lng] = place.position.coordinates;
    console.log(lat, lng);
  } catch (err) {
    console.log(err);
  }

  const apiKey = process.env.REACT_APP_EMBADED_MAP;
  console.log(apiKey);

  useEffect(() => {
    startFetch(placeId);
  }, [startFetch, placeId]);

  return (
    <div className="place-container">
      <h1>Place Page</h1>
      <div className="google-map-container">
        <p>the map with the place maximum zoom</p>
        <iframe
          title="GooglePlace"
          width="600"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
          &q=${lng},${lat}`}
          allowfullscreen
        ></iframe>
      </div>
      <p>Author name</p>
      <p>take me there google maps</p>
      <p>update, delete, messanger icon</p>
      <p>rating</p>
      <p>description</p>
      <div>
        <p>rating commenter</p>
        <p>comments</p>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});
const mapDispatchToProps = dispatch => ({
  startFetch: placeId => dispatch(startFetch(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Place);
