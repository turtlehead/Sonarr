var _ = require('underscore');
var SettingsLayoutBase = require('../SettingsLayoutBase');
var GeneralView = require('./GeneralView');
var GeneralSettingsModel = require('./GeneralSettingsModel');

module.exports = SettingsLayoutBase.extend({
  template: 'Settings/General/GeneralLayoutTemplate',

  regions: {
    general: '#general'
  },

  initialize() {
    this.model = new GeneralSettingsModel();
    SettingsLayoutBase.prototype.initialize.apply(this, arguments);
  },

  onRender() {
    var promise = this.model.fetch();

    promise.done(_.bind(function() {
      if (this.isDestroyed) {
        return;
      }

      this.general.show(new GeneralView({ model: this.model }));
    }, this));
  }
});
