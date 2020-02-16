import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomButton from '../../reuseble/custom-button/custom-button';

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

const MapComponent = ({
  places,
  startFetchPlacesWithin,
  history,
  address,
  coords,
  ...props
}) => {
  const [coord, setCoord] = useState(null);
  try {
    if (coords) {
      const { lat, lng } = coords.payload;

      setCoord({ lat, lng });
    }
  } catch (err) {
    console.log(err);
  }
  const style = {
    width: '100%',
    height: '100%'
  };
  const [marker, setMarker] = useState({});
  const [visible, setVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});

  const { latitude, longitude } = usePosition();

  const lat = latitude;
  const lng = longitude;

  let cent;
  if (coord) {
    cent = coord;
  } else {
    cent = {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
  }

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
        style={style}
        className="map"
        initialCenter={cent ? cent : roma}
        center={cent ? cent : roma}
      >
        {places.length > 0
          ? places.map((place, index) => {
              console.log(place);
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
    apiKey: process.env.REACT_APP_GEOLOCATION_KEY
  })(MapComponenttWithRouter)
);
