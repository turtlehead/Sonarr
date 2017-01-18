var PageableCollection = require('backbone.paginator');
var ManualImportModel = require('./ManualImportModel');
var AsSortedCollection = require('Mixins/AsSortedCollection');

var Collection = PageableCollection.extend({
  model: ManualImportModel,
  url: window.Sonarr.ApiRoot + '/manualimport',

  state: {
    sortKey: 'quality',
    order: 1,
    pageSize: 100000
  },

  mode: 'client',

  originalFetch: PageableCollection.prototype.fetch,

  initialize(options) {
    options = options || {};

    if (!options.folder && !options.downloadId) {
      throw 'folder or downloadId is required';
    }

    this.folder = options.folder;
    this.downloadId = options.downloadId;
  },

  fetch(options) {
    options = options || {};

    options.data = { folder: this.folder, downloadId: this.downloadId };

    return this.originalFetch.call(this, options);
  },

  sortMappings: {
    series: {
      sortValue(model, attr, order) {
        var series = model.get(attr);

        if (series) {
          return series.sortTitle;
        }

        return '';
      }
    },

    quality: {
      sortKey: 'qualityWeight'
    }
  },

  comparator(model1, model2) {
    var quality1 = model1.get('quality');
    var quality2 = model2.get('quality');

    if (quality1 < quality2) {
      return 1;
    }

    if (quality1 > quality2) {
      return -1;
    }

    return 0;
  }
});

Collection = AsSortedCollection.call(Collection);

module.exports = Collection;
