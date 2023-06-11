import icons from 'url:../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _msg = 'Recipe added';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // call _addHandlerShowWindow soon as we instatiate this class
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // the this keyword points to the form event handler
      const dataArr = [...new FormData(this)];
      // ES 2019 convert the FormData to an obj
      const dataObj = Object.fromEntries(dataArr);
      handler(dataObj);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
