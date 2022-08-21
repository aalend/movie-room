import View from './View';

class GenreMoviesView extends View {
  _parentElement = document.querySelector('.tags');

  addHandlerGenresMovies(subscriberFn) {
    return subscriberFn();
  }

  _generateMarkup() {
    return this._data
      .map(genre => {
        return `
        <li class="tag">
          <a href="${genre.id}">${genre.name}</a>
        </li>`;
      })
      .join('');
  }
}

export default new GenreMoviesView();
