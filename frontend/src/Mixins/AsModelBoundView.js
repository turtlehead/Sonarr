var ModelBinder = require('backbone.modelbinder');

function asModelBoundView() {
  const originalOnRender = this.prototype.onRender;
  const originalBeforeClose = this.prototype.onBeforeClose;

  this.prototype.onRender = function() {
    if (!this.model) {
      throw Error('View has no model for binding');
    }

    if (!this._modelBinder) {
      this._modelBinder = new ModelBinder();
    }

    var options = {
      changeTriggers: {
        '': 'change typeahead:selected typeahead:autocompleted',
        '[contenteditable]': 'blur',
        '[data-onkeyup]': 'keyup'
      }
    };

    this._modelBinder.bind(this.model, this.el, this.bindings, options);

    if (originalOnRender) {
      originalOnRender.call(this);
    }
  };

  this.prototype.onBeforeClose = function() {
    if (this._modelBinder) {
      this._modelBinder.unbind();
      delete this._modelBinder;
    }

    if (originalBeforeClose) {
      originalBeforeClose.call(this);
    }
  };

  return this;
}


module.exports = asModelBoundView;
