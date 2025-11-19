/**
 * @file
 * dnorthman theme JavaScript.
 */

(function (Drupal, once) {
  "use strict";


  const swiper = new Swiper('.testimonial-slider', {
    loop:true,
    slidesPerView: 1,
    spaceBetween: 60,
    
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
