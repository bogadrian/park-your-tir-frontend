import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
import runtimeEnv from '@mars/heroku-js-runtime-env';
import './place.scss';
const env = runtimeEnv();

const Place = ({ place, currentUser, history }) => {
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
    <div>
      {place ? (
        <div className="place-container">
          <div className="google-map-container place-option">
            <div className="place-option ">
              <h2>{place.name}</h2>
            </div>
            <div className="place-option">
              <CustomButton handleClick={handleClick}>
                Take me There
              </CustomButton>
            </div>
          </div>
          <div className="place-option">
            <PlaceIframe />
          </div>
          <div className="place-option">
            {place.images ? (
              <div className="place-option place-image-option">
                {place.images[0] ? (
                  <Zoom>
                    <img
                      className="img-place"
                      src={`${env.REACT_APP_EMBADED_MAP}/api/v1/img/places/${place.images[0]}`}
                      alt="image1"
                      width="200"
                    />
                  </Zoom>
                ) : null}

                {place.images[1] ? (
                  <Zoom>
                    <img
                      className="img-place"
                      src={`${env.REACT_APP_EMBADED_MAP}/api/v1/img/places/${place.images[1]}`}
                      alt="image2"
                      width="200"
                    />
                  </Zoom>
                ) : null}

                {place.images[2] ? (
                  <Zoom>
                    <img
                      className="img-place"
                      src={`${env.REACT_APP_EMBADED_MAP}/api/v1/img/places/${place.images[2]}`}
                      alt="image3"
                      width="200"
                    />
                  </Zoom>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="place-option">
            <h3>{place.description}</h3>
          </div>
          <div className="place-option">
            <h2>Place Rataing Average</h2>
            <StarRate />
          </div>
          <div className="place-option">
            <AuthorName />
          </div>
          <div>{currentUser ? <UpdateDeletePlace /> : null}</div>
          <div className="place-option">
            <CommentsComp placeId={place._id} />
          </div>
          <div className="place-option">
            <h3>comments</h3>
            {!currentUser ? (
              <h2>Please login to comment!</h2>
            ) : (
              <div>
                <Comment id={place._id} onChange={handleChange} />
              </div>
            )}
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
