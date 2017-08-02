'use strict';

/**
 * Setup namespace
 */
if (typeof ubuntu === 'undefined') {
  var ubuntu = {};
}

if (ubuntu.hasOwnProperty('cookiePolicy')) {
  throw TypeError("Namespace 'ubuntu' not available");
}

// The cookie policy injection and interaction
ubuntu.cookiePolicy = function () {
  var context = null;
  var options = {
    'content': 'We use cookies to improve your experience. By your continued\n      use of this site you accept such use. To change your settings\n      please\n      <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">\n        see our policy\n      </a>.'
  };

  return {
    setup: function setup(options) {
      var content = options.content;
      var duration = options.duration;
      var start = '\n        <dialog\n          tabindex="0"\n          open="open"\n          role="alertdialog"\n          class="p-notification--cookie-policy"\n          aria-labelledby="cookie-policy-title"\n          aria-describedby="cookie-policy-content">\n          <h1 id="cookie-policy-title" class="u-off-screen">\n            Cookie policy notification\n          </h1>\n          <p class="p-notification__content"\n            id="cookie-policy-content"\n            role="document"\n            tabindex="0">';
      var end = '\n            <button class="p-notification__close js-close"\n               aria-label="Close this cookie policy notification">Close</button>\n          </p>\n        </dialog>';
      if (!content) {
        content = 'We use cookies to improve your experience. By your continued\n          use of this site you accept such use. To change your settings\n          please\n          <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">\n            see our policy\n          </a>.';
      }

      if (this.getCookie('_cookies_accepted') !== 'true') {
        var range = document.createRange();
        var fullNotice = start + ' ' + content + ' ' + end;
        var cookieNode = range.createContextualFragment(fullNotice);
        document.body.insertBefore(cookieNode, document.body.lastChild);
        this.context = document.querySelector('.p-notification--cookie-policy');
        this.context.querySelector('.js-close').addEventListener('click', function (e) {
          e.preventDefault();
          this.closeCookie();
        }.bind(this));

        if (duration) {
          window.setTimeout(function () {
            this.closeCookie();
          }.bind(this), duration);
          window.addEventListener('unload', function () {
            this.closeCookie();
          }.bind(this));
        }
      }
    },

    closeCookie: function closeCookie() {
      console.log(this.context);
      if (this.context.getAttribute('open')) {
        this.context.removeAttribute('open');
        this.setCookie('_cookies_accepted', 'true', 3000);
      }
    },

    setCookie: function setCookie(name, value, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + '; ' + expires;
    },

    getCookie: function getCookie(name) {
      var name = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  };
}();