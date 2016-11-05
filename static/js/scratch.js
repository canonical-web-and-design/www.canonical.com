

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

  core.setupAccordion = function() {
    Y.all('.row-project li').each(function(node) {
      node.one('h3').append('<span></span>');
      node.one('a').on('click',function(e) {
        e.preventDefault();
        this.toggleClass('active');
        this.next('div').toggleClass('active');
      });
    });
  };

  core.setupAccordion();
  core.resizeListener();
});

core.getInsightsFeed = function(url, maxItems, htmlID, type) {
  $.getFeed({
    url: url,
    success: function(feed) {
      var html = "";
      for(var i = 0; i < feed.items.length && i < maxItems; i++) {
        var item = feed.items[i];
        if (type == "resource") {
          html += "<li><a href='{0}'>{1}</a><p class='note'>{2}</p></li>".format(item.link, item.title, item.category);
        } else {
          html += "<li><a href='{0}'>{1}</a><p class='note'><time pubdate datetime='{2}'>{3}</time></p></li>".format(item.link, item.title, item.updated, item.nicedate);
        }
      }

      if ($(htmlID)) {
        $(htmlID).append(html);
      }
    }
  });
}
