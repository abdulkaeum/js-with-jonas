class SearchView {
  // .search is the form
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    return (this._parentElement.querySelector('.search__field').value = '');
  }

  addHandlerSearch(handler) {
    // user clicks submit btn or submits form
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
