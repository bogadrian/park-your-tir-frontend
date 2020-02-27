import { connect } from 'react-redux';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import { selectMiIsLoaded } from '../../../redux/getMe/getMe-selector';

import WithSpinner from '../../with-spinner/with-spinner';
import MyPlaces from './my-places';

const mapStateToProps = createStructuredSelector({
  isLoading: selectMiIsLoaded
});

const MyPlacesSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(MyPlaces);

export default MyPlacesSpinner;
