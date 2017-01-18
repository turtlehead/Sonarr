var Backbone = require('backbone');
var PageableCollection = require('backbone.paginator');
var EpisodeModel = require('./EpisodeModel');
var AsSelectableCollection = require('Mixins/Collection/AsSelectableCollection');
require('./EpisodeCollection');

var EpisodeCollection = PageableCollection.extend({
  url: window.Sonarr.ApiRoot + '/episode',
  model: EpisodeModel,

  state: {
    sortKey: 'episodeNumber',
    order: 1,
    pageSize: 100000
  },

  mode: 'client',

  originalFetch: Backbone.Collection.prototype.fetch,

  initialize(options) {
    this.seriesId = options.seriesId;
  },

  bySeason(season) {
    var filtered = this.filter(function(episode) {
      return episode.get('seasonNumber') === season;
    });

    return new EpisodeCollection(filtered);
  },

  comparator(model1, model2) {
    var episode1 = model1.get('episodeNumber');
    var episode2 = model2.get('episodeNumber');

    if (episode1 < episode2) {
      return 1;
    }

    if (episode1 > episode2) {
      return -1;
    }

    return 0;
  },

  fetch(options) {
    if (!this.seriesId) {
      throw 'seriesId is required';
    }

    if (!options) {
      options = {};
    }

    options.data = { seriesId: this.seriesId };

    return this.originalFetch(options);
  }
});

EpisodeCollection = AsSelectableCollection.apply(EpisodeCollection);
module.exports = EpisodeCollection;
