import * as model from './models';
import popularMoviesView from './views/popularMoviesView';
import trendingMoviesView from './views/trendingMoviesView';
import topRatedMoviesView from './views/topRatedMoviesView';
import loadMoreMoviesView from './views/loadMoreMoviesView';
import genreMoviesView from './views/genreMoviesView';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const initSwiper = function () {
  new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 24,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    breakpoints: {
      '@0.50': {
        slidesPerView: 2,
      },
      '@0.75': {
        slidesPerView: 3,
      },
      '@1.00': {
        slidesPerView: 4,
      },
      '@1.50': {
        slidesPerView: 5,
      },
    },
  });
};

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

const init = function () {
  popularMoviesView.addHandlerFeaturedMovie(controlPopularMovies);
  trendingMoviesView.addhandlerTrendingMovies(controlTrendingMovies);
  topRatedMoviesView.addHandlerTopRatedMovies(controlTopRatedMovies);
  loadMoreMoviesView.addHandlerLoadMoreMovies(controlLoadMoreMovies);
  genreMoviesView.addHandlerGenresMovies(controlMovieGenres);
};

init();
