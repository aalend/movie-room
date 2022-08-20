import icons from '../../assets/images/icons.svg';
import View from './View';

class TrendingMoviesView extends View {
  _parentElement = document.querySelector('.swiper-wrapper');

  addhandlerTrendingMovies(subscriberFn) {
    window.addEventListener('DOMContentLoaded', subscriberFn);
  }

  _generateMarkup() {
    return this._data
      .map(movie => {
        return `<li class="swiper-slide" data-id="${movie.id}">
        <a href="#hashfromAPI" aria-label="${movie.title}">
          <div class="card" style="background: url(${movie.backdrop}) no-repeat center/cover">
            <h3>${movie.title}</h3>
            <p class="flex gap-xs">
              <svg class="icon">
                <use xlink:href="${icons}#star"></use>
              </svg>
              ${movie.rating}
            </p>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }
}

export default new TrendingMoviesView();
