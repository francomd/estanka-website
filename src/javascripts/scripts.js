const $ = require('jquery');

window.$ = $;

require('popper.js');
require('bootstrap');

// Mouse move oposite position
const elementToMove = Array.prototype.slice.call(document.querySelectorAll('[move-range]'));

document.addEventListener('mousemove', (e) => {
  const eased = e.pageX / window.innerWidth;

  elementToMove.forEach((element) => {
    const range = element.getAttribute('move-range').split(',');
    const min = parseFloat(range[0]);
    const max = parseFloat(range[1]);

    const ease = min + (eased * (max - min));

    // eslint-disable-next-line no-param-reassign
    element.style.webkitTransform = `translateX(${ease}%)`;
    // eslint-disable-next-line no-param-reassign
    element.style.transform = `translateX(${ease}%)`;
  });
});
