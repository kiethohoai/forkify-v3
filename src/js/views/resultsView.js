import View from './View.js';
import previewView from './previewView.js';

// TODO: ResultsView
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = `No recipe found for your query! Please try again ;)`;
  _message;

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
