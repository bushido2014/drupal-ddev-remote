(function (Drupal) {
  'use strict';

  Drupal.behaviors.mobileMenu = {
    attach: function (context) {
      const toggle = context.querySelector('.main-nav__mobile-toggle');
      const menu = context.querySelector('.main-menu');

      if (!toggle || !menu || toggle.dataset.init) return;
      toggle.dataset.init = true;

      toggle.onclick = () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
      };

      // Close on outside click
      document.onclick = (e) => {
        if (!e.target.closest('.main-nav') && menu.classList.contains('active')) {
          toggle.classList.remove('active');
          menu.classList.remove('active');
        }
      };

      // Close on resize
      window.onresize = () => {
        if (window.innerWidth > 1024) {
          toggle.classList.remove('active');
          menu.classList.remove('active');
        }
      };
    }
  };

})(Drupal);