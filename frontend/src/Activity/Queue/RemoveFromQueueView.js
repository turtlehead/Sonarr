var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Activity/Queue/RemoveFromQueueView',

  events: {
    'click .x-confirm-remove': 'removeItem'
  },

  ui: {
    blacklist: '.x-blacklist',
    indicator: '.x-indicator'
  },

  initialize(options) {
    this.templateHelpers = {
      showBlacklist: options.showBlacklist
    };
  },

  removeItem() {
    var blacklist = this.ui.blacklist.prop('checked') || false;

    this.ui.indicator.show();

    this.model.destroy({
      data: { 'blacklist': blacklist },
      wait: true
    }).done(function() {
      vent.trigger(vent.Commands.CloseFullscreenModal);
    });
  }
});
