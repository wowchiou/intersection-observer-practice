import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getNowPlayingMovie(page) {
    return axiosTMDB.get(
      `/movie/now_playing?api_key=${API_KEY}&language=zh-TW&page=${page}`
    );
  },
};
