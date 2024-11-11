class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // this._parentElement.querySelector('.search__field').value = `pizza`;
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// TODO: Export
export default new SearchView();
