/**
 * @file
 * dnorthman theme JavaScript.
 */
(function (Drupal) {
  "use strict";


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


})(Drupal);
