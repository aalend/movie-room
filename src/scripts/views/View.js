export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  styleBackdropImage() {
    this._parentElement.style.background = `var(--color-neutral-800) url("${this._data.backdrop}") no-repeat center/cover`;
  }

  render(data) {
    if (!data) return;

    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
