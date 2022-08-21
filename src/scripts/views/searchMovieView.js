import icons from '../../assets/images/icons.svg';
import View from './View';

class SearchMovieView extends View {
  _formElement = document.querySelector('.form');
  _parentElement = document.querySelector('.main-content');

  addHandlerSearchMovie(subscriberFn) {
    this._formElement.addEventListener('submit', function (e) {
      e.preventDefault();

      return subscriberFn(e);
    });

    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      return subscriberFn(e);
    });
  }

  _generateMarkup() {
    const { results, query } = this._data;
    return `
      <section
        class="search-results | padding-block-xl"
        aria-label="Search results for ${query}"
      >
        <div class="container flow">
          <h2>
            Search results for: 
            <span class="text-accent-900">${query}</span>
          </h2>
          <div class="divider divider--gradient"></div>
          <ul class="adaptive-grid">
          ${results
            .map(movie => {
              return `
              <li>
                <a class="top-rated__link" href="${movie.id}" aria-label="${movie.title}">
                  <div class="card" style="background: url(${movie.poster}) no-repeat center/cover">
                    <h3>${movie.title}</h3>
                    <p class="flex gap-xs">
                      <svg class="icon">
                        <use
                          xlink:href="${icons}#star"
                        ></use>
                      </svg>
                      ${movie.rating}
                    </p>
                  </div>
                </a>
              </li>`;
            })
            .join('')}
          </ul>
        </div>
      </section>`;
  }
}

export default new SearchMovieView();
