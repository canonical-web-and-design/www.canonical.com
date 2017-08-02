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
ubuntu.cookiePolicy = function() {
  let context = null;
  let options = {
    'content':
      `We use cookies to improve your experience. By your continued
      use of this site you accept such use. To change your settings
      please
      <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">
        see our policy
      </a>.`
  }

  return {
    setup: function(options) {
      let content = options.content;
      let duration = options.duration;
      let start = `
        <dialog
          tabindex="0"
          open="open"
          role="alertdialog"
          class="p-notification--cookie-policy"
          aria-labelledby="cookie-policy-title"
          aria-describedby="cookie-policy-content">
          <h1 id="cookie-policy-title" class="u-off-screen">
            Cookie policy notification
          </h1>
          <p class="p-notification__content"
            id="cookie-policy-content"
            role="document"
            tabindex="0">`;
      let end = `
            <button class="p-notification__close js-close"
               aria-label="Close this cookie policy notification">Close</button>
          </p>
        </dialog>`;
      if (!content) {
        content =
          `We use cookies to improve your experience. By your continued
          use of this site you accept such use. To change your settings
          please
          <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">
            see our policy
          </a>.`;
      }

      if (this.getCookie('_cookies_accepted') !== 'true') {
        var range = document.createRange();
        var fullNotice = `${start} ${content} ${end}`;
        var cookieNode = range.createContextualFragment(fullNotice);
        document.body.insertBefore(cookieNode, document.body.lastChild);
        this.context = document.querySelector('.p-notification--cookie-policy');
        this.context.querySelector('.js-close').addEventListener(
          'click', function(e) {
          e.preventDefault();
          this.closeCookie();
        }.bind(this));

        if (duration) {
          window.setTimeout(function() {
            this.closeCookie();
          }.bind(this), duration);
          window.addEventListener('unload', function() {
            this.closeCookie();
          }.bind(this));
        }
      }
    },

    closeCookie: function() {
      if (this.context.getAttribute('open')) {
        this.context.removeAttribute('open');
        this.setCookie('_cookies_accepted', 'true', 3000);
      }
    },

    setCookie: function (name, value, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + '; ' + expires;
    },

    getCookie: function(name) {
      var name = name + '=';
      var ca = document.cookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length,c.length);
        }
      }
      return '';
    }
  }
}();