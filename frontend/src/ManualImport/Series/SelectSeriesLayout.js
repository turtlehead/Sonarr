var _ = require('underscore');
var Marionette = require('marionette');
var TableView = require('Table/TableView');
var seriesCollection = require('Series/seriesCollection');
var SelectSeriesRow = require('./SelectSeriesRow');

module.exports = Marionette.LayoutView.extend({
  template: 'ManualImport/Series/SelectSeriesLayout',

  regions: {
    series: '.x-series'
  },

  ui: {
    filter: '.x-filter'
  },

  headers: [
    {
      name: 'title',
      label: 'Title'
    }
  ],

  initialize() {
    this.seriesCollection = seriesCollection.clone();
    this._setModelCollection();

    this.listenTo(this.seriesCollection, 'modelselected', this._onSelected);
    this.listenTo(this, 'modal:afterShow', this._setFocus);
  },

  onRender() {
    var tableView = new TableView({
      collection: this.seriesCollection,
      childView: SelectSeriesRow,
      headers: this.headers
    });

    this.series.show(tableView);
    this._setupFilter();
  },

  _setupFilter() {
    var self = this;

    // TODO: This should be a mixin (same as Add Series searching)
    this.ui.filter.keyup(function(e) {
      if (_.contains([
        9,
        16,
        17,
        18,
        19,
        20,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        91,
        92,
        93
      ], e.keyCode)) {
        return;
      }

      self._filter(self.ui.filter.val());
    });
  },

  _filter(term) {
    this.seriesCollection.setFilter({ key: 'title', value: term, type: 'contains' });

    this._setModelCollection();
  },

  _onSelected(model) {
    this.trigger('manualimport:selected:series', { model: model });
    this.destroy();
  },

  _setFocus() {
    this.ui.filter.focus();
  },

  _setModelCollection() {
    // TODO: Remove this work around because the model's collection is reset due to the filtering

    _.each(this.seriesCollection.models, (model) => {
      model.collection = this.seriesCollection;
    });
  }
});
