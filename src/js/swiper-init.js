import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';

const initSwiper = () => {
  if (window.innerWidth <= 320) {
    initMobileCarousel();
    return;
  }

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

  const setupCustomNavigation = () => {
    const prevButtons = document.querySelectorAll(
      '.character-card__nav-btn--prev'
    );
    const nextButtons = document.querySelectorAll(
      '.character-card__nav-btn--next'
    );

    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (characterSwiper) {
          characterSwiper.slidePrev();
        }
      });
    });

    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (characterSwiper) {
          characterSwiper.slideNext();
        }
      });
    });
  };

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
      scale: 0.85,
      borderRadius: 40,
    },
    spaceBetween: 65,
    initialSlide: 1,
    loop: true,
    loopFillGroupWithBlank: true,
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

    breakpoints: {
      321: {
        slidesPerView: 1,
        coverflowEffect: {
          depth: 0,
        },
        spaceBetween: 65,
      },
      768: {
        slidesPerView: 3,
        coverflowEffect: {
          depth: 50,
        },
        spaceBetween: 65,
      },
      1200: {
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 100,
        },
        spaceBetween: 65,
      },
      1800: {
        slidesPerView: 'auto',
        coverflowEffect: {
          depth: 150,
        },
        spaceBetween: 65,
      },
    },
    on: {
      resize: function () {
        if (window.innerWidth <= 320) {
          this.destroy(true, true);
          initMobileCarousel();
        }

        this.update();
      },
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
            const card = slide.querySelector('.character-card');
            if (card) {
              card.style.transform = 'scale(0.85)';
              card.style.opacity = '0.7';
              card.style.borderRadius = '40px';
            }
          } else {
            const card = slide.querySelector('.character-card');
            if (card) {
              card.style.borderRadius = '40px';
            }
          }
        });

        setupCustomNavigation();
      },
      slideChangeTransitionStart: function () {
        this.slides.forEach((slide, index) => {
          const card = slide.querySelector('.character-card');
          if (!card) return;

          if (slide.classList.contains('swiper-slide-active')) {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
            card.style.borderRadius = '40px';
          } else {
            card.style.transform = 'scale(0.85)';
            card.style.opacity = '0.7';
            card.style.borderRadius = '40px';
          }
        });
      },
    },
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 320) {
      if (characterSwiper) {
        characterSwiper.destroy(true, true);
      }
      initMobileCarousel();
    }
  });
};

const initMobileCarousel = () => {
  if (window.innerWidth > 320) {
    return;
  }

  const createMobileCarousel = () => {
    const swiperContainer = document.querySelector('.swiper-container');
    if (!swiperContainer) return;

    let originalSlides = Array.from(
      document.querySelectorAll('.character-slide')
    );

    if (originalSlides.length > 3) {
      originalSlides = originalSlides.filter(
        (slide, index) => index < 3 && !slide.classList.contains('clone-slide')
      );
    }

    if (originalSlides.length > 0) {
      originalSlides = originalSlides.slice(0, 3).map(slide => {
        const clonedSlide = slide.cloneNode(true);

        const card = clonedSlide.querySelector('.character-card');
        if (card) {
          card.classList.add('mobile-card');
          card.style.cssText =
            'border-radius: 10px !important; overflow: hidden !important;';

          const cardImage = card.querySelector('.character-card__image');
          if (cardImage) {
            cardImage.classList.add('mobile-card-image');
            cardImage.style.cssText =
              'border-radius: 10px !important; overflow: hidden !important;';
          }

          const cardImg = card.querySelector('.character-card__img');
          if (cardImg) {
            cardImg.classList.add('mobile-card-img');
            cardImg.style.cssText = 'border-radius: 10px !important;';
          }

          const cardContent = card.querySelector('.character-card__content');
          if (cardContent) {
            cardContent.classList.add('mobile-card-content');
            cardContent.style.cssText = '';
            cardContent.style.borderRadius = '0px';
          }
        }
        return clonedSlide;
      });
    } else {
      const slideData = [
        {
          imgSrc: 'img/blueimage.png',
          title: 'Cyclone Master',
          desc: 'Master of rotation and strategy. Can you outsmart the storm?',
        },
        {
          imgSrc: 'img/purpleimg.png',
          title: 'Storm Bringer',
          desc: 'The keeper of the puzzle storm. Solve his challenges to advance!',
        },
        {
          imgSrc: 'img/yellowimg.png',
          title: 'Puzzle Sage',
          desc: 'The wise mentor who offers hidden hints and boosts.',
        },
      ];

      originalSlides = slideData.map(data => {
        const slide = document.createElement('div');
        slide.className = 'character-slide';

        slide.innerHTML = `
          <div class="character-card mobile-card" style="border-radius: 10px !important; overflow: hidden !important;">
            <div class="character-card__image mobile-card-image" style="border-radius: 10px !important; overflow: hidden !important;">
              <img src="${data.imgSrc}" alt="${data.title}" class="character-card__img mobile-card-img" style="border-radius: 10px !important;">
            </div>
            <div class="character-card__content mobile-card-content">
              <h3 class="character-card__title">${data.title}</h3>
              <p class="character-card__description">${data.desc}</p>
            </div>
          </div>
        `;

        return slide;
      });
    }

    swiperContainer.innerHTML = '';

    const carousel = document.createElement('div');
    carousel.className = 'mobile-carousel';
    carousel.style.cssText =
      'border-radius: 10px !important; overflow: hidden !important;';
    swiperContainer.appendChild(carousel);

    const nav = document.createElement('div');
    nav.className = 'mobile-carousel__nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'character-card__nav-btn character-card__nav-btn--prev';
    prevBtn.innerHTML =
      '<img src="./img/arrow-left.png" alt="Previous" class="character-card__nav-icon character-card__nav-icon--prev">';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'character-card__nav-btn character-card__nav-btn--next';
    nextBtn.innerHTML = `
  <svg class="character-card__nav-icon character-card__nav-icon--next" width="24" height="24">
    <use href="./img/sprite.svg#arrow-right"></use>
  </svg>`;
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    carousel.appendChild(nav);

    const pagination = document.createElement('div');
    pagination.className = 'mobile-carousel__pagination';
    swiperContainer.appendChild(pagination);

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.className = 'mobile-carousel__dot';
      dot.dataset.index = i;
      pagination.appendChild(dot);
    }

    let currentIndex = 0;
    let isAnimating = false;

    showSlide(currentIndex);

    function showSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      const displayIndex = index % 3;

      const dots = pagination.querySelectorAll('.mobile-carousel__dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle(
          'mobile-carousel__dot--active',
          i === displayIndex
        );
      });

      const currentSlide = carousel.querySelector('.character-slide');
      if (currentSlide) {
        currentSlide.classList.add('fade-out');

        setTimeout(() => {
          carousel.innerHTML = '';

          carousel.appendChild(nav);

          const slideIndex = index % originalSlides.length;
          const newSlide = originalSlides[slideIndex].cloneNode(true);
          newSlide.classList.add('fade-in');

          const newCard = newSlide.querySelector('.character-card');
          if (newCard) {
            newCard.classList.add('mobile-card');
            newCard.style.cssText =
              'border-radius: 10px !important; overflow: hidden !important;';

            const cardImage = newCard.querySelector('.character-card__image');
            if (cardImage) {
              cardImage.classList.add('mobile-card-image');
              cardImage.style.cssText =
                'border-radius: 10px !important; overflow: hidden !important;';
            }

            const cardImg = newCard.querySelector('.character-card__img');
            if (cardImg) {
              cardImg.classList.add('mobile-card-img');
              cardImg.style.cssText = 'border-radius: 10px !important;';
            }

            const cardContent = newCard.querySelector(
              '.character-card__content'
            );
            if (cardContent) {
              cardContent.classList.add('mobile-card-content');
              cardContent.style.cssText = '';
              cardContent.style.borderRadius = '0px';
            }
          }

          carousel.appendChild(newSlide);

          setTimeout(() => {
            newSlide.classList.remove('fade-in');
            isAnimating = false;
          }, 300);
        }, 300);
      } else {
        const firstSlide = originalSlides[0].cloneNode(true);

        const firstCard = firstSlide.querySelector('.character-card');
        if (firstCard) {
          firstCard.classList.add('mobile-card');
          firstCard.style.cssText =
            'border-radius: 10px !important; overflow: hidden !important;';

          const cardImage = firstCard.querySelector('.character-card__image');
          if (cardImage) {
            cardImage.classList.add('mobile-card-image');
            cardImage.style.cssText =
              'border-radius: 10px !important; overflow: hidden !important;';
          }

          const cardImg = firstCard.querySelector('.character-card__img');
          if (cardImg) {
            cardImg.classList.add('mobile-card-img');
            cardImg.style.cssText = 'border-radius: 10px !important;';
          }

          const cardContent = firstCard.querySelector(
            '.character-card__content'
          );
          if (cardContent) {
            cardContent.classList.add('mobile-card-content');
            cardContent.style.cssText = '';
            cardContent.style.borderRadius = '0px';
          }
        }

        carousel.appendChild(firstSlide);
        isAnimating = false;
      }
    }

    prevBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentIndex =
        (currentIndex - 1 + originalSlides.length) % originalSlides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      if (isAnimating) return;
      currentIndex = (currentIndex + 1) % originalSlides.length;
      showSlide(currentIndex);
    });

    const dots = pagination.querySelectorAll('.mobile-carousel__dot');
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (isAnimating || currentIndex % 3 === i) return;

        currentIndex = i;
        showSlide(currentIndex);
      });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
      if (isAnimating) return;
      touchEndX = e.changedTouches[0].screenX;

      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        currentIndex = (currentIndex + 1) % originalSlides.length;
        showSlide(currentIndex);
      } else if (touchEndX > touchStartX + threshold) {
        currentIndex =
          (currentIndex - 1 + originalSlides.length) % originalSlides.length;
        showSlide(currentIndex);
      }
    });
  };

  createMobileCarousel();

  window.addEventListener('resize', () => {
    if (window.innerWidth > 320) {
      initSwiper();
    }
  });
};

export default initSwiper;
