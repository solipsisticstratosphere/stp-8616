document.addEventListener('DOMContentLoaded', () => {
  import('./js/burgerMenu.js');
  import('./js/swiper-init.js').then(module => {
    const initSwiper = module.default;
    initSwiper();
  });
  import('./js/cookiePopup.js').then(module => {
    const createCookiePopup = module.default;
    createCookiePopup();
  });
});
