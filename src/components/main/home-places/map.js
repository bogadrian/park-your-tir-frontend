import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomButton from '../../reuseble/custom-button/custom-button';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
import { usePosition } from 'use-position';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { startFetchPlacesWithin } from '../../../redux/placesReducer/places-actions';

import {
  selectAddress,
  selectCoordsFunc
} from '../../../redux/coordsReducer/coords-selector';
import { selectPlacesSel } from '../../../redux/placesReducer/places-selector';
import './map.scss';
import Icon from '../../../images/icon.png';

//const api = process.env.REACT_APP_GEOLOCATION_KEY;


const MapComponent = ({
  places,
  startFetchPlacesWithin,
  history,
  address,
  coords,
  ...props
}) => {
  console.log(api);
  const [marker, setMarker] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  let { latitude, longitude } = usePosition();

  let lat, lng, cent;
  if (latitude && longitude) {
    lat = latitude;
    lng = longitude;
    cent = { lat, lng };
  }

  if (coords.payload) {
    cent = coords.payload;
  }

  useEffect(() => {
    startFetchPlacesWithin({ range: 100, latitude, longitude });
  }, [startFetchPlacesWithin, latitude, longitude]);

  const onMarkerClick = (props, marker, e) => {
    setMarker(marker);
    setVisible(!visible);
    setSelectedPlace(props);
  };

  const onInfoWindowOpen = () => {
    const button = (
      <CustomButton
        handleClick={e => {
          history.push(`/place/${selectedPlace.id}`);
        }}
      >
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          See Place
        </div>
      </CustomButton>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById('iwc')
    );
  };

  return (
    <div className="map-container">
      {places ? (
        <Map
          className="map"
          google={props.google}
          zoom={10}
          initialCenter={cent}
          center={cent}
        >
          {places.length > 0
            ? places.map((place, index) => {
                return (
                  <Marker
                    key={index}
                    id={place.id}
                    position={{
                      lat: place.position.coordinates[1],
                      lng: place.position.coordinates[0]
                    }}
                    icon={{
                      url: Icon
                    }}
                    onClick={onMarkerClick}
                    name={place.name}
                    imaage={place.images[0]}
                  />
                );
              })
            : null}

          <InfoWindow
            marker={marker}
            visible={visible}
            onOpen={e => onInfoWindowOpen()}
          >
            <div>
              <h1 style={{ textAlign: 'center' }}>{selectedPlace.name}</h1>
              <div style={{ marginTop: '-15px' }} id="iwc" />
            </div>
          </InfoWindow>
        </Map>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  address: selectAddress,
  coords: selectCoordsFunc,
  places: selectPlacesSel
});

const mapDispatchToProps = dispatch => ({
  startFetchPlacesWithin: payload => dispatch(startFetchPlacesWithin(payload))
});

const MapComponenttWithRouter = withRouter(MapComponent);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: api
  })(MapComponenttWithRouter)
);
