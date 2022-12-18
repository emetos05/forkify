import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and more pages to follow
    if (currentPage === 1 && numPages > 1) {
      return this._generateNextBtn(currentPage);
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generatePreviousBtn(currentPage);
    }

    // pages between first and last
    if (currentPage < numPages) {
      return `
        ${this._generatePreviousBtn(currentPage)}
        ${this._generateNextBtn(currentPage)};
      `;
    }

    // Only 1 page to display
    return '';
  }

  _generateNextBtn(currentPage) {
    return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generatePreviousBtn(currentPage) {
    return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }
}

export default new PaginationView();
