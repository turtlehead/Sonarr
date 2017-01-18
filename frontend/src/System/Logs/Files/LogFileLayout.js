var vent = require('vent');
var Marionette = require('marionette');
var Backgrid = require('backgrid');
var FilenameCell = require('./FilenameCell');
var RelativeDateCell = require('Cells/RelativeDateCell');
var DownloadLogCell = require('./DownloadLogCell');
var LogFileRow = require('./Row');
var ContentsView = require('./ContentsView');
var ContentsModel = require('./ContentsModel');
var LoadingView = require('Shared/LoadingView');
require('jQuery/jquery.spin');

module.exports = Marionette.Layout.extend({
  template: 'System/Logs/Files/LogFileLayoutTemplate',

  regions: {
    grid: '#x-grid',
    contents: '#x-contents'
  },

  columns: [
    {
      name: 'filename',
      label: 'Filename',
      cell: FilenameCell,
      sortable: false
    },
    {
      name: 'lastWriteTime',
      label: 'Last Write Time',
      cell: RelativeDateCell,
      sortable: false
    },
    {
      name: 'downloadUrl',
      label: '',
      cell: DownloadLogCell,
      sortable: false
    }
  ],

  initialize(options) {
    this.collection = options.collection;
    this.deleteFilesCommand = options.deleteFilesCommand;

    this.listenTo(vent, vent.Commands.ShowLogFile, this._fetchLogFileContents);
    this.listenTo(vent, vent.Events.CommandComplete, this._commandComplete);
    this.listenTo(this.collection, 'sync', this._collectionSynced);

    this._showActionBar();
    this.collection.fetch();
  },

  onShow() {
    this._showTable();
  },

  _showActionBar() {
    var actions = {
      type: 'default',
      storeState: false,
      items: [
        {
          tooltip: 'Refresh',
          icon: 'icon-sonarr-refresh',
          callback: this._refreshTable
        },
        {
          tooltip: 'Clear Log Files',
          icon: 'icon-sonarr-clear',
          command: this.deleteFilesCommand,
          successMessage: 'Log files have been deleted',
          errorMessage: 'Failed to delete log files'
        }
      ]
    };

    vent.trigger(vent.Commands.OpenActionBarCommand, {
      parentView: this,
      actions: actions
    });
  },

  _showTable() {
    this.grid.show(new Backgrid.Grid({
      row: LogFileRow,
      columns: this.columns,
      collection: this.collection,
      className: 'table table-hover'
    }));
  },

  _collectionSynced() {
    if (!this.collection.any()) {
      return;
    }

    var model = this.collection.first();
    this._fetchLogFileContents({ model: model });
  },

  _fetchLogFileContents(options) {
    this.contents.show(new LoadingView());

    var model = options.model;
    var contentsModel = new ContentsModel(model.toJSON());

    this.listenToOnce(contentsModel, 'sync', this._showDetails);

    contentsModel.fetch({ dataType: 'text' });
  },

  _showDetails(model) {
    this.contents.show(new ContentsView({ model: model }));
  },

  _refreshTable(buttonContext) {
    this.contents.close();
    var promise = this.collection.fetch();

    //Would be nice to spin the icon on the refresh button
    if (buttonContext) {
      buttonContext.ui.icon.spinForPromise(promise);
    }
  },

  _commandComplete(options) {
    if (options.command.get('name') === this.deleteFilesCommand.toLowerCase()) {
      this._refreshTable();
    }
  }
});