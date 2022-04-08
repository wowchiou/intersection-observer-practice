import Http from '@/api';

export const fetchNowPlayingMovies = (page) => {
  return Http.getNowPlayingMovie(page)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export default {
  fetchNowPlayingMovies,
};
