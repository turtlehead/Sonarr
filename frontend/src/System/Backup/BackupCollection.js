var PageableCollection = require('backbone.paginator');
var BackupModel = require('./BackupModel');

module.exports = PageableCollection.extend({
  url: window.Sonarr.ApiRoot + '/system/backup',
  model: BackupModel,

  state: {
    sortKey: 'time',
    order: 1,
    pageSize: 100000
  },

  mode: 'client'
});
