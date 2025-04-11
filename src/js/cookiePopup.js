const COOKIE_CONSENT_KEY = 'cookieConsent';

const createCookiePopup = () => {
  if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
    return;
  }

  const cookiePopup = document.createElement('div');
  cookiePopup.className = 'cookie-popup';

  cookiePopup.innerHTML = `
    <div class="cookie-popup__content">
      <div class="cookie-popup__text-container">
        <h2 class="cookie-popup__title">Cookies Policy</h2>
        <p class="cookie-popup__description">
          We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.
        </p>
      </div>
      <div class="cookie-popup__buttons">
        <button class="cookie-popup__button cookie-popup__button--decline" tabindex="0" aria-label="Decline cookies">DECLINE COOKIES</button>
        <button class="cookie-popup__button cookie-popup__button--accept" tabindex="0" aria-label="Accept cookies">ACCEPT COOKIES</button>
      </div>
    </div>
  `;

  document.body.appendChild(cookiePopup);

  const acceptButton = cookiePopup.querySelector(
    '.cookie-popup__button--accept'
  );
  const declineButton = cookiePopup.querySelector(
    '.cookie-popup__button--decline'
  );

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    cookiePopup.classList.add('cookie-popup--hidden');
    setTimeout(() => {
      cookiePopup.remove();
    }, 500);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    cookiePopup.classList.add('cookie-popup--hidden');
    setTimeout(() => {
      cookiePopup.remove();
    }, 500);
  };

  acceptButton.addEventListener('click', handleAccept);
  declineButton.addEventListener('click', handleDecline);

  acceptButton.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAccept();
    }
  });

  declineButton.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDecline();
    }
  });
};

document.addEventListener('DOMContentLoaded', createCookiePopup);

export default createCookiePopup;
