import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { startFetch } from '../../../redux/fetchPlace/fetchPlace-action';
import { selectPlaceItem } from '../../../redux/fetchPlace/fetchPlace-selector';

const api = process.env.REACT_APP_EMBADED_MAP;

const PlaceIframe = ({ startFetch, place, ...props }) => {
  //const env = runtimeEnv();
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

  useEffect(() => {
    startFetch(placeId);
  }, [startFetch, placeId]);

  return (
    <div className="iframe">
      <iframe
        title="GooglePlace"
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: '1px', alignItems: 'center' }}
        src={`https://www.google.com/maps/embed/v1/place?key=${api}&q=${lng},${lat}&zoom=13"`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

const mapDispatchToProps = dispatch => ({
  startFetch: placeId => dispatch(startFetch(placeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceIframe);
