import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { startGetMe } from '../../../redux/getMe/getMe-actions';
import { selectMe } from '../../../redux/getMe/getMe-selector';
import MyPlacesItem from './my-places-item';
import './my-places.scss';

const MyPlaces = ({ startGetMe, me }) => {
  useEffect(() => {
    startGetMe();
  }, [startGetMe]);

  return (
    <div className="myplaces-container">
      {me
        ? me.places.map(place => <MyPlacesItem key={place.id} place={place} />)
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
