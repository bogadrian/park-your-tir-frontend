import truck from '../../images/truck.png';
import axios from 'axios';
const FormData = require('form-data');

export const makeCallToServerWithPlace = async place => {
  const data = place.payload;

  const coords = data.coords.payload;
  const photo = data.photo;
  const name = data.name.payload;
  const desc = data.desc.payload;
  const rating = data.rating.payload;

  const { lat, lng } = coords;

  const photos = photo.map(single => {
    return single;
  });

  const token = localStorage.getItem('jwt');

  let form = new FormData();

  if (!photos) {
    form.append('images', truck);
  } else {
    photos.forEach(photo => {
      form.append('images', photo);
    });
  }
  form.append('name', name);
  form.append('description', desc);
  form.append('ratingsAverage', rating);
  form.append('placeAuthor', ['5e1603a598dfb0579454701d']);
  form.append('position', [lng, lat]);

  const axiosInstance = await axios.create({
    baseURL: 'http://127.0.0.1:3000/api/v1/places',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      'Access-Control-Allow-Origin': '*'
    }
  });

  for (let [key, value] of form.entries()) {
    console.log(key, value);
  }

  const placeUpdate = await axiosInstance({
    method: 'POST',
    data: form
  });

  console.log(placeUpdate.data.data);
  return placeUpdate.data.data;
};

export default makeCallToServerWithPlace;
