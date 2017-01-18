var Marionette = require('marionette');
var ItemView = require('./NotificationItemView');
var SchemaModal = require('./Add/NotificationSchemaModal');

module.exports = Marionette.CompositeView.extend({
  itemView: ItemView,
  itemViewContainer: '.notification-list',
  template: 'Settings/Notification/NotificationCollectionView',

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
