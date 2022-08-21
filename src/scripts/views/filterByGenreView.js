import View from './View';

class FiltredByGenreView extends View {
  _parentElement = document.querySelector('.tags');

  addHandlerFilterByGenre(subscriberFn) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      return subscriberFn(e);
    });
  }
}

export default new FiltredByGenreView();
