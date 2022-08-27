import movieTrailer from 'movie-trailer';
import { API_KEY, API_URL, IMG_PATH } from './config';
import { getJSON, createObject } from './helpers';

export const state = {
  singleMovie: {
    details: {},
  },
  popularMovies: {},
  trendingMovies: {},
  featuredMovie: {},
  topRatedMovies: {
    results: [],
    currentPage: 1,
    totalPages: '',
  },
  genresList: {},
  filtredMovies: {
    results: [],
    currentPage: 1,
    totalPages: '',
  },
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

export const loadSingleMovie = async function (movieID) {
  try {
    const [data, { cast }, { results }] = await Promise.all([
      getJSON(`${API_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`),
      getJSON(`${API_URL}/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`),
      getJSON(`${API_URL}/movie/${movieID}/similar?api_key=${API_KEY}&language=en-US&page=1`),
    ]);

    state.singleMovie.details = {
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
      cast: [...cast],
      similarMovies: [...results],
    };
  } catch (error) {
    throw error;
  }
};

export const loadTrendingMovies = async function () {
  try {
    const response = await fetch(`${API_URL}/trending/movie/week?api_key=${API_KEY}`);
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

    const { page: currentPage, results, total_pages: totalPages } = await response.json();

    state.topRatedMovies.currentPage = currentPage;
    state.topRatedMovies.totalPages = totalPages;

    if (page) {
      let newResults;
      newResults = results.map(movie => createObject(movie));
      state.topRatedMovies.results = [...state.topRatedMovies.results, ...newResults];
    }
  } catch (error) {
    throw error;
  }
};

export const loadMovieGenres = async function () {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const { genres } = await response.json();

    state.genresList = genres.map(genre => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const loadFiltredMoviesByGenre = async function (genreID) {
  try {
    const response = await fetch(`
    ${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=$1&with_genres=${genreID}`);

    const { results } = await response.json();

    state.filtredMovies.results = results.map(movie => createObject(movie));
  } catch (error) {
    throw error;
  }
};

export const loadSearchMoviesByID = async function (query) {
  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&include_adult=false&query=${query}`
    );
    const { results } = await response.json();

    state.search.query = query;
    state.search.results = results.map(movie => createObject(movie));
  } catch (error) {
    throw error;
  }
};

export const loadTrailerForMovie = async function (tmdbId) {
  try {
    const trailerUrl = await movieTrailer(null, {
      tmdbId: tmdbId,
    });

    state.singleMovie.details = {
      ...state.singleMovie.details,
      trailerUrl,
    };

    console.log(state.singleMovie);
  } catch (error) {
    throw error;
  }
};
