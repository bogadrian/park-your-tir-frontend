import React, { useEffect } from 'react';
//import { withRouter, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { startGetMe } from '../../../redux/getMe/getMe-actions';
import { selectMe } from '../../../redux/getMe/getMe-selector';
import './my-places.scss';

const MyPlaces = ({ startGetMe, me }) => {
  let history = useHistory();

  useEffect(() => {
    startGetMe();
  }, [startGetMe]);

  const handleClick = ({ place }) => {
    history.push(`/place/${place.id}`);
  };

  return (
    <div className="myplaces-container">
      {me
        ? me.places.map(place => (
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
          ))
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  me: selectMe
});

const mapDispatchToProps = dispatch => ({
  startGetMe: () => dispatch(startGetMe())
});

//const MyPlacesWithRouter = withRouter(MyPlaces);
export default connect(mapStateToProps, mapDispatchToProps)(MyPlaces);
