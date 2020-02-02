import axios from 'axios';

export const fetchAddressFromCoords = async latlng => {
  const response = await axios.get(
    `http://127.0.0.1:3000/api/v1/places/addressByCoords/${latlng}`
  );

  return response;
};

export const fetchCoordsFromAdress = async address => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const data = address;

  const url = `http://127.0.0.1:3000/api/v1/places/coordByAdress/${address}`;

  const response = await axios.get(url, data, config);

  return response;
};
