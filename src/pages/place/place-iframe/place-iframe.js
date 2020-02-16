import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { startFetch } from '../../../redux/fetchPlace/fetchPlace-action';
import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';

const PlaceIframe = ({ startFetch, place, ...props }) => {
  const placeId = useParams().placeId;
  let lat;
  let lng;
  try {
    if (place.position) {
      [lat, lng] = place.position.coordinates;
    }
  } catch (err) {
    console.log(err);
  }

  const apiKey = process.env.REACT_APP_EMBADED_MAP;

  useEffect(() => {
    startFetch(placeId);
  }, [startFetch, placeId]);

  return (
    <iframe
      title="GooglePlace"
      width="600"
      height="450"
      frameBorder="0"
      style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
          &q=${lng},${lat}`}
      allowFullScreen
    ></iframe>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

const mapDispatchToProps = dispatch => ({
  startFetch: placeId => dispatch(startFetch(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceIframe);
