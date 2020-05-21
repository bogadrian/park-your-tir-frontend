import React, { useState } from 'react';

import Address from '../../components/reuseble/address/address';
import PlaceDataName from '../../components/main/place-data/place-data';
import Upload3Photo from '../../components/main/home-places/upload3photo/upload3photo';
import StarRating from '../../components/main/home-places/star-rating/star-rating';

import ItemsCarousel from 'react-items-carousel';
import CustomButton from '../../components/reuseble/custom-button/custom-button';

import './create-place.scss';

const CreatePlace = props => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div className="place-container">
      <div>
        <h2 className="create-place-headline">
          You can create a place filling the adress or just allowing the
          geolocation on your device to fetch your actual position
        </h2>
      </div>
      <div>
        <div
          className="chevron-carusel"
          style={{ padding: `0 ${chevronWidth}px` }}
        >
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            gutter={20}
            leftChevron={
              <div>
                <div className="buttonPrevBig">
                  <CustomButton>{'<PREV'}</CustomButton>
                </div>
                <div className="buttonPrevLittle">
                  <h1 style={{ fontSize: 30 }}>{'<<'}</h1>
                </div>
              </div>
            }
            rightChevron={
              <div>
                <div className="buttonNextBig">
                  <CustomButton>{'NEXT>'}</CustomButton>
                </div>
                <div className="buttonNextLittle">
                  <h1 style={{ fontSize: 30 }}>{'>>'}</h1>
                </div>
              </div>
            }
            outsideChevron
            chevronWidth={chevronWidth}
          >
            <div style={{ height: 500 }}>
              <Address />
            </div>
            <div style={{ height: 500 }}>
              <PlaceDataName />
            </div>
            <div style={{ height: 500 }}>
              <Upload3Photo />
            </div>
            <div style={{ height: 500 }}>
              <h1 style={{ textAlign: 'center' }}>
                Please give a rating to this place!
              </h1>
              <StarRating />
            </div>
          </ItemsCarousel>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
