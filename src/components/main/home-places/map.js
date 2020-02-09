import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomButton from '../../reuseble/custom-button/custom-button';

import { usePosition } from 'use-position';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { startFetchPlacesWithin } from '../../../redux/placesReducer/places-actions';
import './map.scss';
import Icon from '../../../images/icon.png';

const MapComponent = ({
  places,
  startFetchPlacesWithin,
  history,
  ...props
}) => {
  const [marker, setMarker] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  const { latitude, longitude } = usePosition();

  const lat = latitude;
  const lng = longitude;

  const cent = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  const roma = {
    lat: 41.922385,
    lng: 12.48051
  };

  useEffect(() => {
    startFetchPlacesWithin({ range: 100, lat, lng });
  }, [startFetchPlacesWithin, lat, lng]);

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
        Take me there
      </CustomButton>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById('iwc')
    );
  };

  return (
    <div className="map-container">
      <Map
        google={props.google}
        zoom={10}
        className="map"
        initialCenter={cent !== undefined ? cent : roma}
        center={cent !== undefined ? cent : roma}
      >
        {places.map((place, index) => {
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
        })}

        <InfoWindow
          marker={marker}
          visible={visible}
          onOpen={e => onInfoWindowOpen()}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
            <img
              src={`http://127.0.0.1:3000/images/${selectedPlace.image}`}
              alt={selectedPlace.name}
            />
            <div style={{ marginTop: '-30%' }} id="iwc" />
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

const mapStateToProps = ({ places }) => ({
  places: places.places
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
    apiKey: process.env.REACT_APP_GEOLOCATION_KEY
  })(MapComponenttWithRouter)
);
