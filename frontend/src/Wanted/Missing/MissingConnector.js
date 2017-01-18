import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createCommandsSelector from 'Stores/Selectors/createCommandsSelector';
import * as wantedActions from 'Stores/Actions/wantedActions';
import { executeCommand } from 'Stores/Actions/commandActions';
import { fetchQueueDetails } from 'Stores/Actions/queueActions';
import commandNames from 'Commands/commandNames';
import Missing from './Missing';

function createMapStateToProps() {
  return createSelector(
    (state) => state.wanted.missing,
    createCommandsSelector(),
    (missing, commands) => {
      const isScanningDroneFactory = _.some(commands, { name: commandNames.DOWNLOADED_EPSIODES_SCAN });
      const isSearchingForEpisodes = _.some(commands, { name: commandNames.EPISODE_SEARCH });
      const isSearchingForMissingEpisodes = _.some(commands, { name: commandNames.MISSING_EPISODE_SEARCH });

      const result = _.pick(missing, [
        'fetching',
        'items',
        'page',
        'totalPages',
        'totalRecords',
        'sortKey',
        'sortDirection',
        'filterKey',
        'filterValue'
      ]);

      result.isScanningDroneFactory = isScanningDroneFactory;
      result.isSearchingForEpisodes = isSearchingForEpisodes;
      result.isSearchingForMissingEpisodes = isSearchingForMissingEpisodes;
      result.isSaving = _.some(result.items, { isSaving: true });

      return result;
    }
  );
}

const mapDispatchToProps = {
  ...wantedActions,
  executeCommand,
  fetchQueueDetails
};

class MissingConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchMissing();
  }

  componentWillReceiveProps(nextProps) {
    if (_.differenceBy(nextProps.items, this.props.items, ({ id }) => id).length) {
      const episodeIds = _.uniq(_.reduce(nextProps.items, (result, item) => {
        const id = item.id;

        if (id && id > 0) {
          result.push(id);
        }

        return result;
      }, []));

      this.props.fetchQueueDetails({ episodeIds });
    }
  }

  //
  // Listeners

  onFirstPagePress = () => {
    this.props.gotoMissingFirstPage();
  }

  onPreviousPagePress = () => {
    this.props.gotoMissingPreviousPage();
  }

  onNextPagePress = () => {
    this.props.gotoMissingNextPage();
  }

  onLastPagePress = () => {
    this.props.gotoMissingLastPage();
  }

  onPageSelect = (page) => {
    this.props.gotoMissingPage({ page });
  }

  onSortPress = (sortKey) => {
    this.props.setMissingSort({ sortKey });
  }

  onFilterSelect = (filterKey, filterValue) => {
    this.props.setMissingFilter({ filterKey, filterValue });
  }

  onSearchSelectedPress = (selected) => {
    this.props.executeCommand({
      name: commandNames.EPISODE_SEARCH,
      episodeIds: selected
    });
  }

  onUnmonitorSelectedPress = (selected) => {
    this.props.batchUnmonitorMissingEpisodes({
      episodeIds: selected,
      monitored: false
    });
  }

  onSearchAllMissingPress = () => {
    this.props.executeCommand({
      name: commandNames.MISSING_EPISODE_SEARCH
    });
  }

  onRescanDroneFactoryPress = () => {
    this.props.executeCommand({
      name: commandNames.DOWNLOADED_EPSIODES_SCAN
    });
  }

  //
  // Render

  render() {
    return (
      <Missing
        onFirstPagePress={this.onFirstPagePress}
        onPreviousPagePress={this.onPreviousPagePress}
        onNextPagePress={this.onNextPagePress}
        onLastPagePress={this.onLastPagePress}
        onPageSelect={this.onPageSelect}
        onSortPress={this.onSortPress}
        onFilterSelect={this.onFilterSelect}
        onSearchSelectedPress={this.onSearchSelectedPress}
        onUnmonitorSelectedPress={this.onUnmonitorSelectedPress}
        onSearchAllMissingPress={this.onSearchAllMissingPress}
        onRescanDroneFactoryPress={this.onRescanDroneFactoryPress}
        {...this.props}
      />
    );
  }
}

MissingConnector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMissing: PropTypes.func.isRequired,
  gotoMissingFirstPage: PropTypes.func.isRequired,
  gotoMissingPreviousPage: PropTypes.func.isRequired,
  gotoMissingNextPage: PropTypes.func.isRequired,
  gotoMissingLastPage: PropTypes.func.isRequired,
  gotoMissingPage: PropTypes.func.isRequired,
  setMissingSort: PropTypes.func.isRequired,
  setMissingFilter: PropTypes.func.isRequired,
  batchUnmonitorMissingEpisodes: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired,
  fetchQueueDetails: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(MissingConnector);
