const $ = require('jquery');
const SmoothScroll = require('smooth-scroll');

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

// eslint-disable-next-line no-unused-vars
const scroll = new SmoothScroll('a[href*="#"]', {
  ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
  header: '.navbar', // Selector for fixed headers (must be a valid CSS selector)
  topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"
  speed: 400, // Integer. Amount of time in milliseconds it should take to scroll 1000px
  speedAsDuration: false, // If true, use speed as the total duration of the scroll animation
  durationMax: 600, // Integer. The maximum amount of time the scroll animation should take
  durationMin: 400, // Integer. The minimum amount of time the scroll animation should take
  clip: true, // If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
  easing: 'easeInOutCubic', // Easing pattern to use
  updateURL: true, // Update the URL on scroll
  popstate: true, // Animate scrolling with the forward/backward browser buttons. Requires updateURL
});

// Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

$(document).ready(() => {
  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();

    const elemTop = $(elem).offset().top;
    // const elemBottom = elemTop + $(elem).height();
    // debugger;
    return elemTop <= (docViewBottom - 150);
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(() => {
    $('.animate').toArray().forEach((e) => {
      if (isScrolledIntoView(e) === true) {
        $(e).addClass('animate__animated animate__fadeInUp');
      }
    });
  });
});
