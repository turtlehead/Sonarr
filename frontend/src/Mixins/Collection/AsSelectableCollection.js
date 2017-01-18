var _ = require('underscore');

function AsSelectableCollection() {

  this.prototype.allSelected = function () {
    return _.every(this.models, (model) => model.selected);
  };

  this.prototype.anySelected = function () {
    return _.some(this.models, (model) => model.selected);
  };

  this.prototype.getSelected = function () {
    return _.where(this.models, { selected: true });
  };

  this.prototype.getNotSelected = function () {
    return _.where(this.models, { selected: false });
  };

  this.prototype.selectAll = function () {
    this.toggleAll(true);
  };

  this.prototype.unselectAll = function () {
    this.toggleAll(false);
  };

  this.prototype.toggleAll = function (selected) {
    this.models.forEach((model) => {
      model.selected = !!selected;
      model.trigger('selected', model, model.selected);
    });
  };

  return this;
}

module.exports = AsSelectableCollection;
