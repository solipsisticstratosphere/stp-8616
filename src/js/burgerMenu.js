(() => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuBtn = document.querySelector('[data-menu-button]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const body = document.body;

  if (!mobileMenu || !menuBtn) return;

  const toggleMenu = () => {
    const isMenuOpen = menuBtn.getAttribute('aria-expanded') === 'true';

    menuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    mobileMenu.setAttribute('aria-hidden', isMenuOpen);

    body.style.overflow = isMenuOpen ? '' : 'hidden';
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
      body.style.overflow = '';
    });
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      menuBtn.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', true);
      body.style.overflow = '';
    }
  });
})();
