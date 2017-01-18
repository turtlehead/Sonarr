import _ from 'lodash';
import persistState from 'redux-localstorage';
import { persistState as settingsPersistState } from 'Stores/Reducers/settingsReducers';
import { persistState as systemPersistState } from 'Stores/Reducers/systemReducers';

function slicer(paths) {
  return (state) => {
    const subset = {};

    paths.forEach((path) => {
      _.set(subset, path, _.get(state, path));
    });

    return subset;
  };
}

function merge(initialState, persistedState) {
  const result = persistedState ? _.merge(initialState, persistedState) : initialState;

  return result;
}

const paths = [
  ...settingsPersistState,
  ...systemPersistState
];

const config = {
  slicer,
  merge,
  key: 'sonarr'
};

export default persistState(paths, config);
