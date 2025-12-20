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



 document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('[data-accordion-toggle]');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const body = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // Close ALL buttons
      buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling.classList.remove('show');
      });

      // Open clicked if not active
      if (!isActive) {
        this.classList.add('active');
        body.classList.add('show');
      }
    });
  });
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
