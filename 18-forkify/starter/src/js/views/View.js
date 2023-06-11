import icons from 'url:../../img/icons.svg';

// never instantuated, only using it as a parent class for all other
export default class View {
  _data;

  render(data, render = true) {
    // if no data or if data is array && array is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    // afterbegin = first child recipeContainer div
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    // GENRATE NEW MARKUP BUT NOT RENDER IT, COMPARE NEW HTML TO CUR HTML
    // CHANGE TEXT AND ATTRIBUTES THAT HAVE CHNAGED FROM OLD TO NEW VERSION
    const newMarkup = this._generateMarkup();

    // convert string to DOM obj (living in memory) then we can use to compare to the actual DOM on the page
    // newDom = virtual DOM
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // chnage the text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // change the attr
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    // empty the recipeContainer div
    this._parentElement.innerHTML = '';
  }

  // ## render a spinner for an async task
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(msg = this._errorMsg) {
    const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${msg}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(msg = this._msg) {
    const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-alert-smile"></use>
            </svg>
            </div>
            <p>${msg}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
