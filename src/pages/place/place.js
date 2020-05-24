import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { createStructuredSelector } from 'reselect';
import StarRate from './star-rate/star-rate';

import { selectPlaceItem } from '../../redux/fetchPlace/fetchPlace-selector';
import Comment from '../../components/comment/comment';
import PlaceIframe from './place-iframe/place-iframe';
import AuthorName from './author-name/author-name';
import CommentsComp from '../../components/getCommentsComp/getCommentsComp';
import UpdateDeletePlace from './update-place/update-place';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import { selectUser } from '../../redux/userReducer/user-selector';
import Spinner from '../../components/spinner/spinner';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
import './place.scss';
const url = process.env.REACT_APP_URLC;

const Place = ({ place, currentUser, history }) => {
  //const id = useParams().placeId;

  let placeName;
  if (place && place.name) {
    placeName = place.name;
  }
  let id;
  if (place && place._id) {
    id = place._id;
  }
  console.log(place);

  let image1, image2;
  if (place && place.images) {
    image1 = place.images[0];
    image2 = place.images[1];
  }

  let description;
  if (place && place.data && place.data.description) {
    description = place.data.description;
  }

  let idAuthor;
  if (place && place.placeAuthor && place.placeAuthor.id) {
    idAuthor = place.placeAuthor.id;
  }

  let currentIdAuthor;
  if (
    currentUser &&
    currentUser.data &&
    currentUser.data.user &&
    currentUser.data.user._id
  ) {
    currentIdAuthor = currentUser.data.user._id;
  }

  let lat, lng;

  try {
    if (place.position) {
      [lat, lng] = place.position.coordinates;
    }
  } catch (err) {
    console.log(err);
    history.push('/');
  }

  const handleChange = () => {};
  const handleClick = () => {
    if (lat && lng) {
      window.location.assign(`https://google.com/maps?q=${lng},${lat}`);
    }
  };

  return (
    <div className="the-container">
      {place ? (
        <div className="place-container">
          <div className="google-map-container place-option">
            <div className="place-option ">
              <h2>{placeName}</h2>
            </div>
            <div className="place-option">
              <CustomButton handleClick={handleClick}>
                Take me There
              </CustomButton>
            </div>
          </div>
          <div className="place-option">
            <PlaceIframe className="the-map" />
          </div>

          <div className="images">
            <div className="place-image-option">
              {image1 && (
                <Zoom>
                  <img
                    className="img-place"
                    src={`${url}/api/v1/img/places/${image1}`}
                    alt="image1"
                    width="200"
                  />
                </Zoom>
              )}

              {image2 && (
                <Zoom>
                  <img
                    className="img-place"
                    src={`${url}/api/v1/img/places/${image2}`}
                    alt="image2"
                    width="200"
                  />
                </Zoom>
              )}
            </div>
          </div>
          <div className="under-map">
            <div className="place-option">
              <h3>{description}</h3>
            </div>
            <div className="place-option">
              <h2>Place Rataing Average</h2>
              <StarRate />
            </div>
            <div className="place-option">
              <AuthorName />
            </div>
            <div>
              {idAuthor === currentIdAuthor ? <UpdateDeletePlace /> : null}
            </div>
            <div className="place-option">
              <CommentsComp placeId={id} />
            </div>
            <div className="place-option">
              <h3>comments</h3>
              {!currentUser ? (
                <Link to="/signin">
                  <h2>Please login to comment!</h2>
                </Link>
              ) : (
                <div>
                  <Comment id={id} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem,
  currentUser: selectUser
});

export default withRouter(connect(mapStateToProps)(Place));
