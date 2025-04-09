const adjustBackgroundStripes = () => {
  if (window.innerWidth <= 320) {
    return;
  }

  const logo = document.querySelector('.logo');
  const backgroundStripes = document.querySelector('.background-stripes');
  const container = document.querySelector('.container');
  const nav = document.querySelector('.nav');

  if (!logo || !backgroundStripes || !container || !nav) return;

  const containerRect = container.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const logoRect = logo.getBoundingClientRect();

  const maxWidthWideScreen = getComputedStyle(document.documentElement)
    .getPropertyValue('--max-width-wide-screen')
    .trim();
  const maxWidthValue = maxWidthWideScreen
    ? parseInt(maxWidthWideScreen, 10)
    : 1440;

  if (window.innerWidth >= 1200) {
    let leftBound = containerRect.left;
    let rightBound = containerRect.right;

    if (window.innerWidth <= 1920) {
      backgroundStripes.style.clipPath = `inset(0 calc(100% - ${rightBound}px) 0 ${leftBound}px)`;
    } else {
      const centerPosition = window.innerWidth / 2;
      const halfMaxWidth = maxWidthValue / 2;

      leftBound = centerPosition - halfMaxWidth;
      rightBound = centerPosition + halfMaxWidth;

      backgroundStripes.style.clipPath = `inset(0 calc(100% - ${rightBound}px) 0 ${leftBound}px)`;
    }
  } else {
    const startPosition = logoRect.left;
    const endPosition = navRect.right;
    backgroundStripes.style.clipPath = `inset(0 calc(100% - ${endPosition}px) 0 ${startPosition}px)`;
  }
};

const initBackgroundStripes = () => {
  adjustBackgroundStripes();
  window.addEventListener('resize', adjustBackgroundStripes);
  window.addEventListener('load', adjustBackgroundStripes);
};

export default initBackgroundStripes;
