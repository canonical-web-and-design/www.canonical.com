

//Provides basic templating for strings
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

YUI().use('node', 'cookie', 'event-resize', 'event', 'jsonp', 'json-parse', function(Y) {
  core.setupAdditionalInfo = function() {
    Y.one('.find-out-more').setStyle('cursor', 'pointer').on('click',function(e) {
        this.toggleClass('active');
        Y.one('.external-link-list').toggleClass('active');
    });
  };

  core.resizeListener = function() {
    Y.on('windowresize', function(e) {
      core.redrawGlobal();
    });
    core.globalInit();
  };

  core.createToggle = function(button) {
    if (bottonElement = Y.one(button)) {
      Y.one(bottonElement).setStyle('cursor', 'pointer').on('click',function(e) {
        this.toggleClass('active');
        this.next('div').toggleClass('active');
      });
    }
  };

  core.globalInit= function() {
    if (document.documentElement.clientWidth < 768) {
      core.globalPrepend = '.global-footer-wrapper';
      core.extendGlobalNav();
      core.setupAdditionalInfo();
      Y.one('.nav-global-wrapper').insert('<h2 class="toggle-menu__button">Ubuntu websites</h2>','before');
      core.createToggle('#nav-global h2');
    } else if (document.documentElement.clientWidth >= 768) {
      core.globalPrepend = 'body';
      core.extendGlobalNav();
    }
  };

  core.redrawGlobal = function() {
    var globalNav = Y.one("#nav-global");
    if (document.documentElement.clientWidth < 768 && core.globalPrepend != '.footer') {
      core.globalPrepend = '.global-footer-wrapper';
      if (globalNav) {
        globalNav.remove();
        core.extendGlobalNav();
        core.setupAdditionalInfo();
        Y.one('.nav-global-wrapper').insert('<h2 class="toggle-menu__button">Ubuntu websites</h2>','before');
        core.createToggle('#nav-global h2');
      }
    } else if (document.documentElement.clientWidth >= 768 && core.globalPrepend != 'body') {
      core.globalPrepend = 'body';
      if (globalNav) {
        globalNav.remove();
        core.extendGlobalNav();
      }
    }
  };

  core.extendGlobalNav = function() {
    core.setupGlobalNav();
    if (navGlobal = Y.one('#nav-global')) {
      navGlobal.addClass('toggle-menu');
    }

    if (navWrapper = Y.one('#nav-global .nav-global-wrapper')) {
      navWrapper.addClass('toggle-menu__content');
    }
  }

  core.resizeListener();
});
