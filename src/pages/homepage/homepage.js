import React from 'react';
import { Link } from 'react-router-dom';

import './homepage.scss';

import MapComponent from '../../components/main/home-places/map';

const HomePage = ({ startFetchPlacesWithin }) => {
  return (
    <div className="homepage-container">
      <h1>The Homepage</h1>
      <Link exact to="/create-place">
        Create a New Place
      </Link>
      <MapComponent />
    </div>
  );
};

export default HomePage;
