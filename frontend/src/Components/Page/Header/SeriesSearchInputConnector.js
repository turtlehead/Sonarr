import _ from 'lodash';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createSelector } from 'reselect';
import createAllSeriesSelector from 'Store/Selectors/createAllSeriesSelector';
import SeriesSearchInput from './SeriesSearchInput';

function createMapStateToProps() {
  return createSelector(
    createAllSeriesSelector(),
    (series) => {
      return {
        series: _.sortBy(series, 'sortTitle')
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onGoToSeries(titleSlug) {
      dispatch(push(`${window.Sonarr.UrlBase}/series/${titleSlug}`));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(SeriesSearchInput);
