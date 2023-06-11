import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found';
  _msg = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

// this way there can only be 1 results view and then imported into controller
export default new ResultsView();
