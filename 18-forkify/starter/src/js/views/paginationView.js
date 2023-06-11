import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // figure out which btn was clisked using event delegation
      // select the closest btn element to the clicked element
      // closest() works like querySelecter but searches up in the tree, looks for parents
      // becuase we might click on the span, svg or the use that's within the button
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; // if we click in the div .pagination

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    // number of pages
    const numPages = Math.ceil(
      // e.g 60 arrays / by 10 = 6 pages
      this._data.results.length / this._data.resultsPerPage
    );

    // if we are on page 1, and there are OTHER pages >
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // if we are on last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }

    // other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
