import React, { useState } from 'react';
import Address from '../../components/reuseble/address/address';
import ItemsCarousel from 'react-items-carousel';
import CustomButton from '../../components/reuseble/custom-button/custom-button';
import './create-place.scss';

const CreatePlace = props => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div className="place-container">
      <h2>
        You can create a place filling the adress or just allowing the
        geolocation on your device to fetch your actual position
      </h2>
      <div className="create-place-container">
        <div style={{ padding: `0 ${chevronWidth}px` }}>
          <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={1}
            gutter={40}
            leftChevron={<CustomButton>{'< PREVIOUS'}</CustomButton>}
            rightChevron={<CustomButton>{'NEXT >'}</CustomButton>}
            outsideChevron
            chevronWidth={chevronWidth}
          >
            <div style={{ height: 500 }}>
              <Address />
            </div>
            <div style={{ height: 500 }}>Second card</div>
            <div style={{ height: 500 }}>Third card</div>
            <div style={{ height: 500 }}>Fourth card</div>
          </ItemsCarousel>
        </div>
      </div>
    </div>
  );
};

export default CreatePlace;
