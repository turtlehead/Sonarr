var vent = require('vent');
var Marionette = require('marionette');

module.exports = Marionette.ItemView.extend({
  template: 'Rename/RenamePreviewEmptyCollectionView',

  initialize({ naming }) {
    this.naming = naming;
  },

  serializeData() {
    return {
      renaming: this.naming.get('renamingEnabled')
    };
  }
});