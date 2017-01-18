var _ = require('underscore');
var Backbone = require('backbone');
var SeriesModel = require('../Series/SeriesModel');

module.exports = Backbone.Collection.extend({
  url: window.Sonarr.ApiRoot + '/series/lookup',
  model: SeriesModel,

  parse: function(response) {
    var self = this;

    _.each(response, function(model) {
      model.id = undefined;

      if (self.unmappedFolderModel) {
        model.path = self.unmappedFolderModel.get('folder').path;
      }
    });

    return response;
  }
});
