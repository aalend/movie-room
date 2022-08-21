import icons from '../../assets/images/icons.svg';
import View from './View';

class SingleMovieView extends View {
  _parentElement = document.querySelector('.main-content');

  addHandlerSingleMovie(subscriberFn) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      return subscriberFn(e);
    });
  }

  _generateMarkup() {
    return `
      <div class="movie-page">
        <section
          class="featured-trailer | flow"
          aria-label="${this._data.title}"
          style="background: url(${
            this._data.backdrop
          }) no-repeat center/cover;"
        >
          <div class="flow padding-block-xl padding-inline-md">
            <div class="flex wrap gap-xs font-bold">
              <span>${this._data.releaseDate}</span>
              <span class="flex align-center gap-2xs"
                ><svg class="icon">
                  <use xlink:href="${icons}#star"></use>
                </svg>
                ${this._data.rating}</span
              >
              <span>${this._data.genres.join(' ')}</span>
              <span>${this.minutesToHours(this._data.runtime)}</span>
            </div>
            <h1>${this._data.title}</h1>
            <p>${this._data.tagline}</p>
            <button class="button" type="button" data-button-type="primary">
              Watch trailer
            </button>
          </div>
        </section>
        <section class="featured-trailer-info | padding-block-xl">
          <div class="container flow">
            <h2>Overview</h2>
            <p>${this._data.overview}</p>
          </div>
        </section>
      </div>
      ${this._renderCast()}
      ${this._renderSimilarMovies()}
      `;
  }

  _renderCast() {
    const { cast } = this._data;
    return `
      <section class="featured-trailer-cast | padding-block-xl">
        <div class="container flow">
          <h2>Cast</h2>
          <ul class="cast-list | flex gap-base margin-block-start-lg">
          ${cast
            .slice(0, 5)
            .map(item => {
              return `
              <li>
                <div class="cast-item | flex flex-column gap-xs align-center">
                  <img src="http://image.tmdb.org/t/p/original${item.profile_path}" alt="Cast Name" />
                  <div class="text-center">
                    <h3>${item.original_name}</h3>
                    <p class="text-neutral-300">${item.character}</p>
                  </div>
                </div>
              </li>`;
            })
            .join('')}
          </ul>
        </div>
      </section>`;
  }

  _renderSimilarMovies() {
    const { similarMovies } = this._data;
    return `
      <section class="recommendations padding-block-xl">
        <div class="container flow">
          <h2>Similar recommendations</h2>
          <div class="divider divider--gradient"></div>
          <div class="swiper">
            <ul class="swiper-wrapper | adaptive-grid gap-none">
            ${similarMovies
              .slice(0, 5)
              .map(movie => {
                console.log(movie);
                return `
                <li class="swiper-slide">
                  <a href="${movie.id}" aria-label="${movie.original_title}">
                    <div class="card" style="background: url(http://image.tmdb.org/t/p/original${movie.poster_path}) no-repeat center/cover">
                      <h3>${movie.original_title}</h3>
                      <p class="flex gap-xs">
                        <svg class="icon">
                          <use
                            xlink:href="${icons}#star"
                          ></use>
                        </svg>
                        ${movie.vote_average}
                      </p>
                    </div>
                  </a>
                </li>`;
              })
              .join('')}
            </ul>
          </div>
        </div>
      </section>`;
  }
}

export default new SingleMovieView();
