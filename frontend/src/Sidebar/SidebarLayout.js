const Marionette = require('marionette');
const $ = require('jquery');
const appLayout = require('appLayout');
const HealthView = require('Health/HealthView');
const QueueView = require('Activity/Queue/QueueView');
const ResolutionUtility = require('Utilities/ResolutionUtility');
const menuItems = require('./menuItems');
const tpl = require('./SidebarLayout.hbs');

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  // className: 'aside-inner',

  regions: {
    health: '.x-health',
    queue: '.x-queue',
    activity: '.x-activity'
  },

  ui: {
    sidebar: '.sidebar',
    collapse: '.x-navbar-collapse',
    lists: 'ul',
    listItems: 'li'
  },

  events: {
    'click a': 'onClick',
    'mouseenter .x-nav-root': 'onRootHover'
  },

  initialize() {
    $('[data-toggle-state]').on('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const $target = $(e.target);
      let toggleState = $target.data('toggleState');

      if (!toggleState && $target.closest('a') && $target.closest('a')[0]) {
        toggleState = $($target.closest('a')[0]).data('toggleState');
      }

      if (toggleState) {
        this.$body.toggleClass(toggleState);

        // Remove the floating navbar and the aside-collapsed class
        if (toggleState === 'aside-toggled') {
          this.$aside.children('.nav-floating').remove();
          this.$body.removeClass('aside-collapsed');
        }
      }
      // some elements may need this when toggled class change the content size
      // e.g. sidebar collapsed mode and jqGrid
      $(window).resize();
    });

    this.listenTo(appLayout.mainRegion, 'show', this.onMainRegionShow);
  },

  serializeData() {
    return menuItems.menu;
  },

  onShow() {
    this.health.show(new HealthView());
    this._showQueueNotification();

    this._setActiveBasedOnUri();

    this.$body = $('body');
    this.$aside = $('.aside');
    this.$asideInner = this.$el;
  },

  onMainRegionShow() {
    this._setActiveBasedOnUri();
  },

  onClick(event) {
    event.preventDefault();
    const $target = $(event.target);
    const $li = $target.closest('li');
    this._closeSidebar($li);
    this._setActive($li);
  },

  onRootHover(event) {
    this._removeFloatingNav();

    if (!this.$body.hasClass('aside-collapsed')) {
      return;
    }

    const $navRoot = $(event.target).closest('.x-nav-root');
    const $subNav = $navRoot.children('.x-nav-sub');
    if (!$subNav.length) {
      return;
    }

    this.ui.listItems.removeClass('open');
    $navRoot.addClass('open');

    event.stopPropagation();

    const marginTop = parseInt(this.$asideInner.css('padding-top'), 0) + parseInt(this.$aside.css('padding-top'), 0);
    const itemTop = $navRoot.position().top + marginTop - this.ui.sidebar.scrollTop();

    const $subNavClone = $subNav.clone().addClass('nav-floating').css({
      position: 'fixed',
      top: itemTop
    }).appendTo(this.$aside);

    $subNavClone.on('mouseleave click', () => {
      $subNavClone.remove();
      $navRoot.removeClass('open');
      this._closeSidebar($subNavClone);
    });
  },

  _setActiveBasedOnUri() {
    const location = window.location.pathname;
    const menuItem = menuItems.findByHref(location);
    const $href = this.$(`a[href="${window.Sonarr.UrlBase}${menuItem.href}"]`);
    const $li = $href.closest('li');
    this._setActive($li);
  },

  _setActive($element) {
    const $root = $element.closest('.x-nav-root');
    const $subnav = $root.find('.sidebar-subnav');

    if (!$subnav.hasClass('in')) {
      this.ui.lists.removeClass('in');
      $subnav.addClass('in');
    }

    this.ui.listItems.removeClass('active expanded');

    $element.addClass('active');
    $root.addClass('expanded');
  },

  _removeFloatingNav() {
    $('.sidebar-subnav.nav-floating').remove();
    this.ui.listItems.find('.open').removeClass('open');
  },

  _closeSidebar(element) {
    if (element.hasClass('x-nav-root') && element.children('.x-nav-sub').length > 0 && !element.hasClass('active')) {
      return;
    }

    if (ResolutionUtility.isMobile()) {
      this.$aside.children('.nav-floating').remove();
      $('body').removeClass('actionbar-extended aside-toggled aside-collapsed');
    }
  },

  _showQueueNotification() {
    const promise = $.ajax({
      url: '/queue/status'
    });

    promise.done((data) => {
      this.queue.show(new QueueView(data));
      this.activity.show(new QueueView(data));
    });
  }
});
