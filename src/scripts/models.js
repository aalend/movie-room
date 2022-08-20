import { API_KEY, API_URL, IMG_PATH } from './config';

export const state = {
  featuredMovie: {},
  popularMovies: {},
  trendingMovies: {},
  topRatedMovies: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadPopularMovies = async function () {
  try {
    const response = await fetch(
      `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();

    state.popularMovies = results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.release_date).getFullYear(),
        backdrop: `${IMG_PATH}${movie.backdrop_path}`,
        poster: `${IMG_PATH}${movie.poster_path}`,
        genre: [...movie.genre_ids],
        rating: Math.round(movie.vote_average * 10) / 10,
      };
    });
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
      imdbId: data.imdb_id,
      title: data.original_title,
      tagline: data.tagline,
      rating: Math.round(data.vote_average * 10) / 10,
      overview: data.overview,
      backdrop: `${IMG_PATH}${data.backdrop_path}`,
      poster: `${IMG_PATH}${data.poster_path}`,
      releaseDate: new Date(data.release_date).getFullYear(),
      runtime: data.runtime,
      genres: data.genres.map(genre => genre.name),
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

    state.trendingMovies = results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.release_date).getFullYear(),
        backdrop: `${IMG_PATH}${movie.backdrop_path}`,
        poster: `${IMG_PATH}${movie.poster_path}`,
        genre: [...movie.genre_ids],
        rating: Math.round(movie.vote_average * 10) / 10,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const loadTopRatedMovies = async function () {
  try {
    const response = await fetch(
      `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();

    state.topRatedMovies = results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.release_date).getFullYear(),
        backdrop: `${IMG_PATH}${movie.backdrop_path}`,
        poster: `${IMG_PATH}${movie.poster_path}`,
        genre: [...movie.genre_ids],
        rating: Math.round(movie.vote_average * 10) / 10,
      };
    });
  } catch (error) {
    throw error;
  }
};
