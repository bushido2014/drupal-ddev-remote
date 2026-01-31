(function (Drupal) {
  'use strict';

 // Scroll top button
      let scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        // Click handler
        scrollTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Scroll visibility
        function toggleScrollTop() {
          if (window.scrollY > 100) {
            scrollTop.classList.add('active');
          } else {
            scrollTop.classList.remove('active');
          }
        }
        window.addEventListener('scroll', toggleScrollTop);
        toggleScrollTop(); // Initial check
      }

  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {
      // Run only once on document
      if (context !== document) {
        return;
      }

      const navbarHeader = document.querySelector('.header');
      const body = document.body;
      
      if (!navbarHeader) {
        return;
      }

      // Define pages where sticky header should be disabled
      const excludedNodeTypes = [
        'node--type-home',          // Home page
        // 'node--type-landing',    // Uncomment to exclude landing pages
        // 'node--type-promo',      // Uncomment to exclude promo pages
      ];

      const currentPath = window.location.pathname;
      const excludedPaths = [
        '/home',
        '/ro/home',
        '/en/home',
      ];

      // Check if current page should be excluded
      const isExcludedNodeType = excludedNodeTypes.some(className => 
        body.classList.contains(className)
      );
      
      const isExcludedPath = excludedPaths.some(path => 
        currentPath === path
      );

      // Skip if excluded
      if (isExcludedNodeType || isExcludedPath) {
        // Cleanup
        navbarHeader.classList.remove('header-scrolled');
        navbarHeader.removeAttribute('data-scroll-initialized');
        return;
      }

      // Prevent multiple initializations
      if (navbarHeader.hasAttribute('data-scroll-initialized')) {
        return;
      }

      navbarHeader.setAttribute('data-scroll-initialized', 'true');

      const handleScroll = () => {
        if (window.scrollY > 170) {
          navbarHeader.classList.add('header-scrolled');
        } else {
          navbarHeader.classList.remove('header-scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll);
    }
  };

  

})(Drupal);