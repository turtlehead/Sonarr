import _ from 'lodash';
import { handleActions } from 'redux-actions';
import getSectionState from 'Utilities/State/getSectionState';
import selectProviderSchema from 'Utilities/State/selectProviderSchema';
import updateSectionState from 'Utilities/State/updateSectionState';
import * as types from 'Stores/Actions/actionTypes';
import createSetReducer from './Creators/createSetReducer';
import createSetSettingValueReducer from './Creators/createSetSettingValueReducer';
import createSetProviderFieldValueReducer from './Creators/createSetProviderFieldValueReducer';
import createClearPendingChangesReducer from './Creators/createClearPendingChangesReducer';
import createUpdateReducer from './Creators/createUpdateReducer';
import createUpdateProviderReducer from './Creators/createUpdateProviderReducer';
import createDeleteProviderReducer from './Creators/createDeleteProviderReducer';
import createReducers from './Creators/createReducers';

export const defaultState = {
  ui: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  mediaManagement: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  naming: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  namingExamples: {
    fetching: false,
    populated: false,
    error: null,
    item: {}
  },

  qualityProfiles: {
    fetching: false,
    populated: false,
    error: null,
    fetchingSchema: false,
    schemaPopulated: false,
    schemaError: null,
    schema: {},
    saving: false,
    saveError: null,
    items: [],
    pendingChanges: {}
  },

  delayProfiles: {
    fetching: false,
    populated: false,
    error: null,
    items: [],
    saving: false,
    saveError: null,
    pendingChanges: {}
  },

  qualityDefinitions: {
    fetching: false,
    populated: false,
    error: null,
    items: [],
    saving: false,
    saveError: null,
    pendingChanges: {}
  },

  indexers: {
    fetching: false,
    populated: false,
    error: null,
    fetchingSchema: false,
    schemaPopulated: false,
    schemaError: null,
    schema: [],
    selectedSchema: {},
    saving: false,
    saveError: null,
    testing: false,
    item: {},
    items: [],
    pendingChanges: {}
  },

  indexerSettings: {
    fetching: false,
    populated: false,
    error: null,
    pendingChanges: {},
    saving: false,
    saveError: null,
    item: {}
  },

  restrictions: {
    fetching: false,
    populated: false,
    error: null,
    saving: false,
    saveError: null,
    items: [],
    pendingChanges: {}
  },

  advancedSettings: false
};

export const persistState = [
  'settings.advancedSettings'
];

const propertyNames = [
  'ui',
  'mediaManagement',
  'naming',
  'namingExamples',
  'qualityDefinitions',
  'indexers',
  'indexerSettings'
];

const thingyPropertyNames = [
  'qualityProfiles',
  'delayProfiles',
  'indexers',
  'restrictions'
];

const settingsReducers = handleActions({

  [types.TOGGLE_ADVANCED_SETTINGS]: (state, { payload }) => {
    return Object.assign({}, state, { advancedSettings: !state.advancedSettings });
  },

  [types.SET]: createReducers([...propertyNames, ...thingyPropertyNames], createSetReducer),
  [types.UPDATE]: createReducers([...propertyNames, ...thingyPropertyNames], createUpdateReducer),
  [types.UPDATE_PROVIDER]: createReducers(thingyPropertyNames, createUpdateProviderReducer),
  [types.CLEAR_PENDING_CHANGES]: createReducers([...propertyNames, ...thingyPropertyNames], createClearPendingChangesReducer),

  [types.DELETE_PROVIDER]: createReducers(thingyPropertyNames, createDeleteProviderReducer),

  [types.SET_UI_SETTINGS_VALUE]: createSetSettingValueReducer('ui'),
  [types.SET_MEDIA_MANAGEMENT_SETTINGS_VALUE]: createSetSettingValueReducer('mediaManagement'),
  [types.SET_NAMING_SETTINGS_VALUE]: createSetSettingValueReducer('naming'),
  [types.SET_QUALITY_PROFILE_VALUE]: createSetSettingValueReducer('qualityProfiles'),
  [types.SET_DELAY_PROFILE_VALUE]: createSetSettingValueReducer('delayProfiles'),
  [types.SET_INDEXER_VALUE]: createSetSettingValueReducer('indexers'),
  [types.SET_INDEXER_FIELD_VALUE]: createSetProviderFieldValueReducer('indexers'),
  [types.SET_INDEXER_SETTINGS_VALUE]: createSetSettingValueReducer('indexerSettings'),
  [types.SET_RESTRICTION_VALUE]: createSetSettingValueReducer('restrictions'),

  [types.SELECT_INDEXER_SCHEMA]: function(state, { payload }) {
    return selectProviderSchema(state, 'indexers', payload, (selectedSchema) => {
      selectedSchema.enableRss = selectedSchema.supportsRss;
      selectedSchema.enableSearch = selectedSchema.supportsSearch;

      return selectedSchema;
    });
  },

  [types.SET_QUALITY_DEFINITION_VALUE]: function(state, { payload }) {
    const section = 'qualityDefinitions';
    const { id, name, value } = payload;
    const newState = getSectionState(state, section);
    newState.pendingChanges = _.cloneDeep(newState.pendingChanges);

    const pendingState = newState.pendingChanges[id] || {};
    const currentValue = _.find(newState.items, { id })[name];

    if (currentValue === value) {
      delete pendingState[name];
    } else {
      pendingState[name] = value;
    }

    if (_.isEmpty(pendingState)) {
      delete newState.pendingChanges[id];
    } else {
      newState.pendingChanges[id] = pendingState;
    }

    return updateSectionState(state, section, newState);
  }

}, defaultState);

export default settingsReducers;
