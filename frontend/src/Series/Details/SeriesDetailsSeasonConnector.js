import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { findCommand } from 'Utilities/Command';
import createSeriesSelector from 'Store/Selectors/createSeriesSelector';
import createCommandsSelector from 'Store/Selectors/createCommandsSelector';
import { toggleSeasonMonitored } from 'Store/Actions/seriesActions';
import { toggleEpisodesMonitored } from 'Store/Actions/episodeActions';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import SeriesDetailsSeason from './SeriesDetailsSeason';

function createMapStateToProps() {
  return createSelector(
    (state, { seasonNumber }) => seasonNumber,
    (state) => state.episodes,
    createSeriesSelector(),
    createCommandsSelector(),
    (seasonNumber, episodes, series, commands) => {
      const isSearching = !!findCommand(commands, {
        name: commandNames.SEASON_SEARCH,
        seriesId: series.id,
        seasonNumber
      });

      const episodesInSeason = _.filter(episodes.items, { seasonNumber });
      const sortedEpisodes = _.orderBy(episodesInSeason, 'episodeNumber', 'desc');

      return {
        items: sortedEpisodes,
        isSearching,
        seriesMonitored: series.monitored
      };
    }
  );
}

const mapDispatchToProps = {
  toggleSeasonMonitored,
  toggleEpisodesMonitored,
  executeCommand
};

class SeriesDetailsSeasonConnector extends Component {

  //
  // Listeners

  onMonitorSeasonPress = (monitored) => {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.toggleSeasonMonitored({
      seriesId,
      seasonNumber,
      monitored
    });
  }

  onSearchPress = () => {
    const {
      seriesId,
      seasonNumber
    } = this.props;

    this.props.executeCommand({
      name: commandNames.SEASON_SEARCH,
      seriesId,
      seasonNumber
    });
  }

  onMonitorEpisodePress = (episodeIds, monitored) => {
    this.props.toggleEpisodesMonitored({
      episodeIds,
      monitored
    });
  }

  //
  // Render

  render() {
    return (
      <SeriesDetailsSeason
        {...this.props}
        onMonitorSeasonPress={this.onMonitorSeasonPress}
        onSearchPress={this.onSearchPress}
        onMonitorEpisodePress={this.onMonitorEpisodePress}
      />
    );
  }
}

SeriesDetailsSeasonConnector.propTypes = {
  seriesId: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  toggleSeasonMonitored: PropTypes.func.isRequired,
  toggleEpisodesMonitored: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(SeriesDetailsSeasonConnector);
