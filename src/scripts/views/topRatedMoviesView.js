import icons from '../../assets/images/icons.svg';
import View from './View';

class TopRatedMoviesView extends View {
  _parentElement = document.querySelector('.top-rated__list');

  addHandlerTopRatedMovies(subscriberFn) {
    return subscriberFn();
  }

  _generateMarkup() {
    return this._data
      .map(movie => {
        return `<li data-id="${movie.id}">
        <a class="top-rated__link" href="${movie.id}" aria-label="${movie.title}">
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

export default new TopRatedMoviesView();
