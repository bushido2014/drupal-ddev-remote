/**
 * @file
 * dnorthman theme JavaScript.
 */

(function (Drupal, once) {
  "use strict";


const navbarHeader = document.querySelector('.header');


window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbarHeader.classList.add('header-scrolled');
  } else {
    navbarHeader.classList.remove('header-scrolled');
  }
});


  Drupal.behaviors.dnorthman = {
    attach: function (context, settings) {
      // Restul comportamentului tău
      if (!document.body.classList.contains("dnorthman-loaded")) {
        console.log("🎨 Dnorthman theme loaded successfully!");
        document.body.classList.add("dnorthman-loaded");
      }
    },
  };
})(Drupal, once);
