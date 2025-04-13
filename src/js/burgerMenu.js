(() => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('[data-menu-button]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const body = document.body;
  const burgerIcon = menuBtn ? menuBtn.querySelector('.burger-icon use') : null;
  const closeIcon = closeBtn ? closeBtn.querySelector('.close-icon use') : null;

  if (!mobileMenu || !menuBtn || !burgerIcon) return;

  if (closeBtn && closeIcon) {
    closeBtn.addEventListener('mouseenter', () => {
      closeIcon.setAttribute('href', './img/sprite.svg#close-icon-active');
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeIcon.setAttribute('href', './img/sprite.svg#close-icon');
    });

    closeBtn.addEventListener('focus', () => {
      closeIcon.setAttribute('href', './img/sprite.svg#close-icon-active');
    });

    closeBtn.addEventListener('blur', () => {
      closeIcon.setAttribute('href', './img/sprite.svg#close-icon');
    });
  }

  const toggleMenu = () => {
    const isMenuOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    menuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-hidden', isMenuOpen);

    if (isMenuOpen) {
      burgerIcon.setAttribute('href', './img/sprite.svg#burger-menu');
    } else {
      burgerIcon.setAttribute('href', './img/sprite.svg#burger-menu-active');
    }
  };

  menuBtn.addEventListener('click', toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }

  const menuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', true);
      burgerIcon.setAttribute('href', './img/sprite.svg#burger-menu');
    });
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      menuBtn.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', true);
      burgerIcon.setAttribute('href', './img/sprite.svg#burger-menu');
    }
  });
})();
