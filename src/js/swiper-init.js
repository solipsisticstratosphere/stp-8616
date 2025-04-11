import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';

const initSwiper = () => {
  const duplicateSlides = () => {
    const slides = document.querySelectorAll('.character-slide');
    const wrapper = document.querySelector('.swiper-wrapper');

    if (slides.length === 3 && wrapper) {
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone-slide');
        wrapper.appendChild(clone);
      });

      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add('clone-slide');
        wrapper.appendChild(clone);
      });
    }
  };

  duplicateSlides();

  const characterSwiper = new Swiper('.character-swiper', {
    modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    spaceBetween: 65,
    initialSlide: 1,
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      dynamicBullets: false,
      dynamicMainBullets: 3,
      renderBullet: function (index, className) {
        return index < 3
          ? `<span class="${className}" data-index="${index}"></span>`
          : '';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        coverflowEffect: {
          depth: 0,
        },
      },
      768: {
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 50,
        },
      },
      1200: {
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 100,
        },
      },
      1800: {
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 150,
        },
      },
    },
    on: {
      slideChange: function () {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        if (bullets.length !== 3) return;

        const realIndex = this.realIndex % 3;

        bullets.forEach(bullet => {
          bullet.classList.remove('swiper-pagination-bullet-active');
        });

        bullets[realIndex].classList.add('swiper-pagination-bullet-active');
      },
      init: function () {
        this.slides.forEach((slide, index) => {
          if (!slide.classList.contains('swiper-slide-active')) {
            slide.style.transform = 'scale(0.85)';
            slide.style.opacity = '0.7';
          }
        });
      },
      slideChangeTransitionStart: function () {
        this.slides.forEach((slide, index) => {
          if (slide.classList.contains('swiper-slide-active')) {
            slide.style.transform = 'scale(1)';
            slide.style.opacity = '1';
          } else {
            slide.style.transform = 'scale(0.85)';
            slide.style.opacity = '0.7';
          }
        });
      },
    },
  });
};

export default initSwiper;
