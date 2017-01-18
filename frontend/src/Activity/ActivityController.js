var NzbDroneController = require('Shared/NzbDroneController');
var AppLayout = require('AppLayout');
var QueueLayout = require('./Queue/QueueLayout');
var HistoryLayout = require('./History/HistoryLayout');
var BlacklistLayout = require('./Blacklist/BlacklistLayout');

module.exports = NzbDroneController.extend({
  initialize: function() {
    this.route('activity', this.queue);
    this.route('activity/queue', this.queue);
    this.route('activity/history', this.history);
    this.route('activity/blacklist', this.blacklist);

    NzbDroneController.prototype.initialize.apply(this, arguments);
  },

  queue: function() {
    this.setTitle('Queue');
    this.showMainRegion(new QueueLayout());
  },

  history: function() {
    this.setTitle('History');
    this.showMainRegion(new HistoryLayout());
  },

  blacklist: function() {
    this.setTitle('Blacklist');
    this.showMainRegion(new BlacklistLayout());
  }
});