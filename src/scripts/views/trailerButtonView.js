import View from './View';

class TrailerButtonView extends View {
  _parentElement = document.querySelector('body');

  addHandlerTrailerButton(subscriberFn) {
    this._parentElement.addEventListener('click', function (e) {
      const targetElement = e.target.closest(
        '.button[data-button-type="primary"]'
      );

      if (!targetElement) return;

      return subscriberFn(targetElement);
    });
  }

  _generateMarkup() {
    return ` 
      <video crossorigin="anonymous" width="320" controls>
        <source src="${this._data}" type="video/mp4" />
        <source src="${this._data}" type="video/ogg" />
      </video>`;
  }
}

export default new TrailerButtonView();
