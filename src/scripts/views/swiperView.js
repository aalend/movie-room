import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export const initSwiper = function () {
  new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 24,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    breakpoints: {
      '@0.50': {
        slidesPerView: 2,
      },
      '@0.75': {
        slidesPerView: 3,
      },
      '@1.00': {
        slidesPerView: 4,
      },
      '@1.50': {
        slidesPerView: 5,
      },
    },
  });
};
