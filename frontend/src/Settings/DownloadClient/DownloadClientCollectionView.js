var Marionette = require('marionette');
var ItemView = require('./DownloadClientItemView');
var SchemaModal = require('./Add/DownloadClientSchemaModal');

module.exports = Marionette.CompositeView.extend({
  itemView: ItemView,
  itemViewContainer: '.download-client-list',
  template: 'Settings/DownloadClient/DownloadClientCollectionView',

  ui: {
    'addCard': '.x-add-card'
  },

  events: {
    'click .x-add-card': '_openSchemaModal'
  },

  appendHtml(collectionView, itemView, index) {
    collectionView.ui.addCard.before(itemView.el);
  },

  _openSchemaModal() {
    SchemaModal.open(this.collection);
  }
});