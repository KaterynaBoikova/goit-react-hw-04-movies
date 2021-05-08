import axios from "axios";
const API_KEY = "cd745b1c38819d91d823e4d3c6c216e8";
const BASE_LINK = "https://api.themoviedb.org/3/";

export default {
  fetchTrending() {
    return axios
      .get(`${BASE_LINK}trending/all/day?api_key=${API_KEY}`)
      .then((response) => response.data.results);
  },
  fetchSearchedMovies(query) {
    return axios
      .get(
        `${BASE_LINK}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((response) => response.data.results);
  },
  fetchMovieDetails(id) {
    return axios
      .get(`${BASE_LINK}movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.data);
  },
  fetchReviews(id) {
    return axios
      .get(
        `${BASE_LINK}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => response.data.results);
  },
  fetchCast(id) {
    return axios
      .get(`${BASE_LINK}movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.data);
  },
};

