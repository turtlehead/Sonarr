var NzbDroneCell = require('Cells/NzbDroneCell');
var seriesCollection = require('../seriesCollection');

module.exports = NzbDroneCell.extend({
  className: 'episode-warning-cell',

  render() {
    this.$el.empty();

    if (seriesCollection.get(this.model.get('seriesId')).get('seriesType') === 'anime') {
      if (this.model.get('seasonNumber') > 0 && !this.model.has('absoluteEpisodeNumber')) {
        this.$el.html('<i class="icon-sonarr-form-warning" title="Episode does not have an absolute episode number"></i>');
      }
    }

    this.delegateEvents();
    return this;
  }
});
