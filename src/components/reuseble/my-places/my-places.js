import React, { useEffect } from 'react';
//import { withRouter, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { startGetMe } from '../../../redux/getMe/getMe-actions';
import { selectGetMe } from '../../../redux/getMe/getMe-selector';
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
      <h2>
        {me && me.length > 0
          ? me.map(place => (
              <ul onClick={() => handleClick({ place })} key={place.id}>
                <li>{place.name}</li>
                <li>
                  <img
                    className="img-place"
                    src={`http://127.0.0.1:3000/api/v1/img/places/${place.images[0]}`}
                    alt="place"
                  />
                </li>
              </ul>
            ))
          : null}
      </h2>
      <p>{}</p>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  me: selectGetMe
});

const mapDispatchToProps = dispatch => ({
  startGetMe: () => dispatch(startGetMe())
});

//const MyPlacesWithRouter = withRouter(MyPlaces);
export default connect(mapStateToProps, mapDispatchToProps)(MyPlaces);
