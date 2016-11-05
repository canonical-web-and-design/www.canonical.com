/* Setup namespace
 * TODO: Uncomment this once all core.* items have been removed from scratch.js
 */

// if (typeof core !== 'undefined') {
//   throw TypeError("Namespace 'core' not available");
// }

// var core = {};

/**
 * Show the cookie notification at the bottom of the page,
 * unless it has previously been dismissed
 */
core.cookiePolicy = function() {
  function createCookieNotification() {
    // Create notification element
    closeButton = utilities.createElementFromHtml('<button class="link-cta"></button>');
    closeButton.addEventListener('click', acceptCookiePolicy); // On click, accept and hide

    notification = utilities.createElementFromHtml('<div class="cookie-policy"><div class="wrapper"></div></div>');
    wrapper = notification.querySelector('.wrapper');
    wrapper.appendChild(closeButton);
    wrapper.appendChild(
      utilities.createElementFromHtml(
        '<p>We use cookies to improve your experience. By your continued use of this site you accept such use. To change your settings please <a href="/privacy-policy#cookies">see our policy</a>.</p>'
      )
    );

    // Add notification banner to bottom of body
    document.body.appendChild(notification);
  }

  function acceptCookiePolicy(clickEvent) {
    window.localStorage.setItem('cookiePolicyAccepted', 'true');
    document.body.removeChild(clickEvent.target.closest('.cookie-policy'));
  }

  // If you don't have localStorage, you get away without having to see the cookie notification
  if (window.localStorage) {
    if(! JSON.parse(window.localStorage.getItem('cookiePolicyAccepted'))) {
      createCookieNotification();
    }
  }
};
