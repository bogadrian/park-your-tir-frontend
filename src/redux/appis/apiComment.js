import axios from 'axios';
const token = localStorage.getItem('jwt');

export const makeCallToServerWithComment = async data => {
  const rating = data.rating;
  const id = data.id;
  const comment = data.commentValue;

  const dataComment = JSON.stringify({ comment, rating });
  console.log(dataComment);

  const axiosInstance = await axios.create({
    baseURL: `http://127.0.0.1:3000/api/v1/places/${id}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  const commentPosted = await axiosInstance({
    method: 'POST',
    data: dataComment
  });

  console.log(commentPosted.data.data.data.comment);
  return commentPosted.data.data.data;
};
