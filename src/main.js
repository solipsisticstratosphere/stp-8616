document.addEventListener('DOMContentLoaded', () => {
  import('./js/burgerMenu.js');
  import('./js/backgroundStripes.js').then(module => {
    const initBackgroundStripes = module.default;
    initBackgroundStripes();
  });
});
