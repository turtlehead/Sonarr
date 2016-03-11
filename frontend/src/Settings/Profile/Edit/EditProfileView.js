var _ = require('underscore');
var Marionette = require('marionette');
var LanguageCollection = require('../Language/LanguageCollection');
var Config = require('Config');
var AsModelBoundView = require('Mixins/AsModelBoundView');
var AsValidatedView = require('Mixins/AsValidatedView');

var view = Marionette.ItemView.extend({
  template: 'Settings/Profile/Edit/EditProfileView',

  ui: { cutoff: '.x-cutoff' },

  templateHelpers() {
    return {
      languages: LanguageCollection.toJSON()
    };
  },

  getCutoff() {
    var self = this;

    return _.findWhere(_.pluck(this.model.get('items'), 'quality'), { id: parseInt(self.ui.cutoff.val(), 10) });
  }
});

AsValidatedView.call(view);

module.exports = AsModelBoundView.call(view);
