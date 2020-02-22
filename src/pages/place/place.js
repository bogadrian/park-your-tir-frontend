import React from 'react';
import { connect } from 'react-redux';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { createStructuredSelector } from 'reselect';

import { selectPlaceItem } from '../../redux/fetchPlace/fetchPlace-selector';
import Comment from '../../components/comment/comment';
import PlaceIframe from './place-iframe/place-iframe';
import AuthorName from './author-name/author-name';
import CommentsComp from '../../components/getCommentsComp/getCommentsComp';
import UpdateDeletePlace from './update-place/update-place';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import StarRate from './star-rate/star-rate';

import './place.scss';

const Place = ({ place }) => {
  let lat, lng;
  if (place.position) {
    [lat, lng] = place.position.coordinates;
  }
  const handleChange = () => {};
  const handleClick = () => {
    window.location.assign(`https://google.com/maps?q=${lng},${lat}`);
  };

  return (
    <div className="place-container">
      <div className="google-map-container">
        <div className="place-name">
          <h2 style={{ textAlign: 'center' }}>{place.name}</h2>
          <CustomButton handleClick={handleClick}>Take me There</CustomButton>
        </div>
      </div>
      <div>
        <PlaceIframe />
      </div>
      {place.images ? (
        <div>
          {place.images[0] ? (
            <Zoom>
              <img
                className="img-place"
                src={`http://127.0.0.1:3000/api/v1/img/places/${place.images[0]}`}
                alt="image1"
              />
            </Zoom>
          ) : null}

          {place.images[1] ? (
            <Zoom>
              <img
                className="img-place"
                src={`http://127.0.0.1:3000/api/v1/img/places/${place.images[1]}`}
                alt="image2"
              />
            </Zoom>
          ) : null}

          {place.images[2] ? (
            <Zoom>
              <img
                className="img-place"
                src={`http://127.0.0.1:3000/api/v1/img/places/${place.images[2]}`}
                alt="image3"
              />
            </Zoom>
          ) : null}
        </div>
      ) : null}
      <div>
        <h2>Place Rataing Average</h2>
        <StarRate />
      </div>
      <div className="author-container">
        <p>Author name</p>
        <AuthorName />
      </div>
      <div>
        <UpdateDeletePlace />
      </div>

      <div>
        <p>{place.description}</p>
      </div>

      <div>
        <CommentsComp placeId={place._id} />
      </div>
      <div>
        <h3>comments</h3>
        <Comment id={place.id} onChange={handleChange} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  place: selectPlaceItem
});

export default connect(mapStateToProps)(Place);
