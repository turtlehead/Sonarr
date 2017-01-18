var Marionette = require('marionette');
var AsModelBoundView = require('Mixins/AsModelBoundView');

var view = Marionette.ItemView.extend({
  template: 'Rename/RenamePreviewItemView',

  ui: {
    itemDiv: '.rename-preview-item',
    checkboxIcon: '.rename-checkbox i'
  },

  onRender() {
    this._setItemState();
    this.listenTo(this.model, 'change', this._setItemState);
    this.listenTo(this.model, 'rename:select', this._onRenameAll);
  },

  _setItemState() {
    var checked = this.model.get('rename');
    this.model.trigger('rename:select', this.model, checked);

    if (checked) {
      this.ui.itemDiv.removeClass('do-not-rename');
      this.ui.checkboxIcon.addClass('icon-sonarr-checked');
      this.ui.checkboxIcon.removeClass('icon-sonarr-unchecked');
    } else {
      this.ui.itemDiv.addClass('do-not-rename');
      this.ui.checkboxIcon.addClass('icon-sonarr-unchecked');
      this.ui.checkboxIcon.removeClass('icon-sonarr-checked');
    }
  },

  _onRenameAll(model, checked) {
    this.model.set('rename', checked);
  }
});

module.exports = AsModelBoundView.apply(view);
