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

/**
 * Given a set of anchor triggers and a set of tab items,
 * where the href of the anchors is equivalent to the ID of the target item:
 * Add class 'hide' to all items except the one which is triggered,
 * and add the class 'active' to the active anchor
 *
 * <a href="#one">anchor 1</a> <a href="#two active">anchor 2</a>
 * <div id="one hide">item 1</div> <div id="two">item 2</div>
 */
core.setupTabs = function (menuAnchors, tabItems) {
  menuAnchors.forEach(function(anchor) {
    anchor.addEventListener(
      'click',
      function(menuAnchors, tabItems) {
        return function(clickEvent) {
          clickEvent.preventDefault();
          anchor = clickEvent.target.closest('a');

          // Get the ID for this item from the anchor's hash value
          itemId = anchor.hash;

          // Hide all items but display this one
          tabItems.forEach(function(item) {item.classList.add('hide');});
          document.querySelector(itemId).classList.remove('hide');

          // Deactivate other items and activate this one
          menuAnchors.forEach(function(anchor) {anchor.classList.remove('active');});
          anchor.classList.add('active');
        };
      }(menuAnchors, tabItems)
    );
  });


/**
 * Given a DOM element containing an <a> and a <div>,
 * Setup the <a> to toggle showing and hiding of the <div>
 */
core.setupAccordion = function(container) {
  container.querySelector('h3').appendChild(document.createElement('span'));
  toggleTarget = container.querySelector('div');
  container.querySelector('a').addEventListener(
    'click',
    function (target) {
      return function(clickEvent) {
        clickEvent.preventDefault();
        toggleAnchor = clickEvent.target.closest('a');
        toggleAnchor.classList.toggle('active');
        target.classList.toggle('active');
      };
    }(toggleTarget)
  );
};

/**
 * Add the approproate classes and header to the global nav
 */
core.setupGlobalNav = function(navElement) {
  navElement.classList.add('toggle-menu');
  navElement.querySelector('.nav-global-wrapper').classList.add('toggle-menu__content');

  header = utilities.createElementFromHtml('<h2 class="toggle-menu__button global__header">Ubuntu websites</h2>');

  navElement.insertBefore(header, navElement.querySelector('.nav-global-wrapper'));
};


/**
 * Position the global nav in either the header or the footer
 * depending on window size
 */
core.positionGlobalNav = function(navElement) {
  if (document.documentElement.clientWidth < 768) {
    document.querySelector('.global-footer-wrapper').appendChild(navElement);
  } else {
    document.body.insertBefore(navElement, document.body.firstChild);
  }
};


/**
 * Make the given element clickable, and on click add the 'active' class to it
 * and the element following it.
 */
core.toggleSibling = function(toggleElement) {
  toggleElement.addEventListener(
    'click',
    function(toggleElement) {
      return function(clickEvent) {
        toggleElement.classList.toggle('active');
        toggleElement.nextElementSibling.classList.toggle('active');
      };
    }(toggleElement)
  );
  toggleElement.style.cursor = 'pointer';
};
