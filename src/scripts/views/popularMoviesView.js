import icon from '../../assets/images/icons.svg';

import View from './View';

class FeaturedMovieView extends View {
  _parentElement = document.querySelector('.featured-trailer');

  addHandlerFeaturedMovie(subscriberFn) {
    return subscriberFn();
  }

  _generateMarkup() {
    return `
      <div class="flow padding-block-xl padding-inline-md">
        <div class="flex wrap gap-xs font-bold">
          <span>${this._data.releaseDate}</span>
          <span class="flex align-center gap-2xs">
            <svg class="icon">
              <use xlink:href="${icon}#star"></use>
            </svg> ${this._data.rating}
          </span>
          <span>${this._data.genres.join(' ')}</span>
          <span>${this.minutesToHours(this._data.runtime)}</span>
        </div>
        <h1>${this._data.title}</h1>
        <p>${this._data.overview}</p>
        <button class="button" type="button" data-button-type="primary">
          Watch trailer
        </button>
      </div>`;
  }
}

export default new FeaturedMovieView();
