import axios from 'axios';

const getMovies = async () => {
  const result = await axios.get('https://api.tvmaze.com/shows');
  let movies = result.data;
  movies = movies.slice(0, 6);
  return movies;
};

const GetLikes = async () => {
  const res = await axios.get('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/likes/');
  return res.data;
};
export { getMovies, GetLikes };