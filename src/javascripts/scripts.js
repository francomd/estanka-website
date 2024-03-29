const $ = require('jquery');
const SmoothScroll = require('smooth-scroll');

window.$ = $;

require('popper.js');
require('bootstrap');

$(() => {
  const isMobile = () => {
    let check = false;
    // eslint-disable-next-line func-names
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a,
        )
        // eslint-disable-next-line no-useless-escape
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4),
        )
      ) check = true;
    }(
      navigator.userAgent || navigator.vendor || window.opera,
      'http://detectmobilebrowser.com/mobile',
    ));
    return check;
  };

  // Mouse move oposite position
  const elementToMove = Array.prototype.slice.call(
    document.querySelectorAll('[move-range]'),
  );

  if (!isMobile()) {
    document.addEventListener('mousemove', (e) => {
      const eased = e.pageX / window.innerWidth;

      elementToMove.forEach((element) => {
        const range = element.getAttribute('move-range').split(',');
        const min = parseFloat(range[0]);
        const max = parseFloat(range[1]);

        const ease = min + eased * (max - min);

        // eslint-disable-next-line no-param-reassign
        element.style.webkitTransform = `translateX(${ease}%)`;
        // eslint-disable-next-line no-param-reassign
        element.style.transform = `translateX(${ease}%)`;
      });
    });
  }

  // eslint-disable-next-line no-unused-vars
  const scroll = new SmoothScroll('a[href*="#"]', {
    ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
    header: '.navbar', // Selector for fixed headers (must be a valid CSS selector)
    topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"
    speed: 400, // Integer. Amount of time in milliseconds it should take to scroll 1000px
    speedAsDuration: false, // If true, use speed as the total duration of the scroll animation
    durationMax: 600, // Integer. The maximum amount of time the scroll animation should take
    durationMin: 400, // Integer. The minimum amount of time the scroll animation should take
    clip: true, // If true, adjust scroll distance to prevent abrupt stops
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: true, // Update the URL on scroll
    popstate: true, // Animate scrolling with the forward/backward browser buttons.
  });

  // Scroll function courtesy of Scott Dowding; http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();

    const elemTop = $(elem).offset().top;
    // const elemBottom = elemTop + $(elem).height();
    return elemTop <= docViewBottom - 150;
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(() => {
    $('.animate')
      .toArray()
      .forEach((e) => {
        if (isScrolledIntoView(e) === true) {
          $(e).addClass('animate__animated animate__fadeInUp');
        }
      });
  });

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  // eslint-disable-next-line func-names
  (function () {
    window.addEventListener(
      'load',
      () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, (form) => {
          form.addEventListener(
            'submit',
            (event) => {
              event.preventDefault();
              event.stopPropagation();

              form.classList.add('was-validated');

              if (form.checkValidity() === true) {
                const formValues = {};
                Array.from(form.elements).forEach(
                  // eslint-disable-next-line no-return-assign
                  (e) => (formValues[e.name] = e.value),
                );

                /* get some values from elements on the page: */
                const submit = form.getElementsByTagName('button')[0];

                /* Send the data using post */
                const posting = $.post(form.getAttribute('action'), {
                  first_name: formValues.firstName,
                  last_name: formValues.lastName,
                  email: formValues.email,
                  phone: formValues.phone,
                  city: formValues.city,
                  message: formValues.message,
                });

                form.classList.add('loading');
                submit.setAttribute('disabled', '');

                posting.done(() => {
                  // eslint-disable-next-line no-undef
                  gtag_report_conversion('https://estanka.com.ar/#contacto');

                  setTimeout(() => {
                    submit.innerHTML = 'Datos enviados';
                    form.reset();
                    form.classList.remove('loading');
                    form.classList.remove('was-validated');

                    setTimeout(() => {
                      submit.innerHTML = 'Enviar';
                      submit.removeAttribute('disabled');
                    }, 3000);
                  }, 1500);
                });
              }
            },
            false,
          );
        });
      },
      false,
    );
  }());
});
