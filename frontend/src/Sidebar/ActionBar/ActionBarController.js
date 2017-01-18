var Marionette = require('marionette');
var vent = require('vent');
var AppLayout = require('../../AppLayout');
var ActionBarLayout = require('./ActionBarLayout');

module.exports = Marionette.AppRouter.extend({
  initialize: function () {
    vent.on(vent.Commands.OpenActionBarCommand, this._openActionBar, this);
    vent.on(vent.Commands.CloseActionBarCommand, this._closeActionBar, this);
  },

  _openActionBar: function (options) {
    var view = new ActionBarLayout(options);

    AppLayout.actionBarRegion.show(view);
  },
  

  _closeActionBar: function () {
    AppLayout.actionBarRegion.close();
  }
});