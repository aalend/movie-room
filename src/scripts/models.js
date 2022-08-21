import { API_KEY, API_URL, IMG_PATH } from './config';

export const state = {
  featuredMovie: {},
  popularMovies: {},
  trendingMovies: {},
  topRatedMovies: {
    results: [],
    currentPage: 1,
    totalPages: '',
  },
  search: {
    query: '',
    results: [],
  },
};

const createObject = function (data) {
  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    releaseDate: new Date(data.release_date).getFullYear(),
    backdrop: `${IMG_PATH}${data.backdrop_path}`,
    poster: `${IMG_PATH}${data.poster_path}`,
    genre: [...data.genre_ids],
    rating: Math.round(data.vote_average * 10) / 10,
  };
};

export const loadPopularMovies = async function () {
  try {
    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();

    state.popularMovies = results.map(movie => createObject(movie));
  } catch (error) {
    // Re-throwing an error to handle it in controller
    throw error;
  }
};

export const loadFeaturedMovieDetails = async function () {
  try {
    const featuredMovieID = state.popularMovies.at(0).id;

    const response = await fetch(
      `${API_URL}/movie/${featuredMovieID}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();

    state.featuredMovie = {
      id: data.id,
      title: data.original_title,
      overview: data.overview,
      releaseDate: new Date(data.release_date).getFullYear(),
      backdrop: `${IMG_PATH}${data.backdrop_path}`,
      poster: `${IMG_PATH}${data.poster_path}`,
      genres: data.genres.map(genre => genre.name),
      rating: Math.round(data.vote_average * 10) / 10,
      imdbId: data.imdb_id,
      tagline: data.tagline,
      runtime: data.runtime,
    };
  } catch (error) {
    throw error;
  }
};

export const loadTrendingMovies = async function () {
  try {
    const response = await fetch(
      `${API_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();

    state.trendingMovies = results.map(movie => createObject(movie));
  } catch (error) {
    throw error;
  }
};

export const loadTopRatedMovies = async function (page = 1) {
  try {
    const response = await fetch(
      `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    const {
      page: currentPage,
      results,
      total_pages: totalPages,
    } = await response.json();

    state.topRatedMovies.currentPage = currentPage;
    state.topRatedMovies.totalPages = totalPages;

    if (page) {
      let newResults;
      newResults = results.map(movie => createObject(movie));
      state.topRatedMovies.results = [
        ...state.topRatedMovies.results,
        ...newResults,
      ];
    }
  } catch (error) {
    throw error;
  }
};
