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

  const token = localStorage.getItem('jwt');

  const imag = photo.map(img => {
    return img.payload;
  });

  let form = new FormData();
  imag.forEach(im => {
    if (im[0]) {
      form.append('images', im[0]);
    } else if (im[0] && im[1]) {
      form.append('images', im[0]);
      form.append('images', im[1]);
    } else if (im[0] && im[1] && im[2]) {
      form.append('images', im[0]);
      form.append('images', im[1]);
      form.append('images', im[2]);
    } else {
      form.append('images', truck);
    }
  });

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
  console.log(placeUpdate);
  return placeUpdate.data.data;
};

export default makeCallToServerWithPlace;
