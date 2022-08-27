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
}

export default new TrailerButtonView();
