import * as model from './models';
import { initSwiper } from './views/swiperView';
import popularMoviesView from './views/popularMoviesView';
import trendingMoviesView from './views/trendingMoviesView';
import topRatedMoviesView from './views/topRatedMoviesView';
import loadMoreMoviesView from './views/loadMoreMoviesView';
import genreMoviesView from './views/genreMoviesView';
import filtredByGenreView from './views/filterByGenreView';
import singleMovieView from './views/singleMovieView';
import searchMovieView from './views/searchMovieView';

const controlPopularMovies = async function () {
  try {
    await model.loadPopularMovies();
    await model.loadFeaturedMovieDetails();

    popularMoviesView.render(model.state.featuredMovie);
    popularMoviesView.styleBackdropImage(model.state.featuredMovie.backdrop);
  } catch (error) {
    console.log(error);
  }
};

const controlTrendingMovies = async function () {
  try {
    await model.loadTrendingMovies();

    trendingMoviesView.render(model.state.trendingMovies);
    initSwiper();
  } catch (error) {
    console.log(error);
  }
};

const controlTopRatedMovies = async function () {
  try {
    await model.loadTopRatedMovies();

    topRatedMoviesView.render(model.state.topRatedMovies.results);
  } catch (error) {
    console.log(error);
  }
};

const controlLoadMoreMovies = async function () {
  try {
    let currPage = model.state.topRatedMovies.currentPage;
    const lastPage = model.state.topRatedMovies.totalPages;

    currPage < lastPage ? currPage++ : currPage;
    model.state.topRatedMovies.currentPage = currPage;

    await model.loadTopRatedMovies(currPage);
    loadMoreMoviesView.render(model.state.topRatedMovies.results);
  } catch (error) {
    console.log(error);
  }
};

const controlMovieGenres = async function () {
  try {
    await model.loadMovieGenres();

    genreMoviesView.render(model.state.genresList);
  } catch (error) {
    console.log(error);
  }
};

const controlFilterByGenre = async function (e) {
  try {
    const targetElement = e.target.closest('a');
    const button = e.target
      .closest('.top-rated')
      .querySelector('.button-load-more');
    if (!targetElement) return;

    const genreID = targetElement.getAttribute('href');
    button.innerHTML = 'No more results';
    button.disabled = true;

    await model.loadFiltredMoviesByGenre(genreID);
    topRatedMoviesView.render(model.state.filtredMovies.results);
  } catch (error) {
    console.log(error);
  }
};

const controlSingleMovie = async function (e) {
  try {
    const targetElement = e.target.closest('.top-rated__link');

    if (!targetElement) return;
    const movieID = targetElement.getAttribute('href');

    await model.loadSingleMovie(movieID);
    singleMovieView.render(model.state.singleMovie.details);
    initSwiper();
  } catch (error) {
    console.log(error);
  }
};

const controlSearchMovie = async function (e) {
  try {
    const inputElement = e.target.querySelector('input').value;
    if (!inputElement) return;

    await model.loadSearchMoviesByID(inputElement);
    searchMovieView.render(model.state.search);
    singleMovieView.render();
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  popularMoviesView.addHandlerFeaturedMovie(controlPopularMovies);
  trendingMoviesView.addhandlerTrendingMovies(controlTrendingMovies);
  topRatedMoviesView.addHandlerTopRatedMovies(controlTopRatedMovies);
  loadMoreMoviesView.addHandlerLoadMoreMovies(controlLoadMoreMovies);
  genreMoviesView.addHandlerGenresMovies(controlMovieGenres);
  filtredByGenreView.addHandlerFilterByGenre(controlFilterByGenre);
  singleMovieView.addHandlerSingleMovie(controlSingleMovie);
  searchMovieView.addHandlerSearchMovie(controlSearchMovie);
};
init();
