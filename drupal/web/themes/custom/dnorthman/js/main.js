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
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  const buttons = accordion.querySelectorAll('.accordion-button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.dataset.accordionTarget;
      const body = accordion.querySelector('#' + targetId);
      const isActive = this.classList.contains('active');

      // Close all
      buttons.forEach(btn => btn.classList.remove('active'));
      accordion.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('show'));

      // Open clicked
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
