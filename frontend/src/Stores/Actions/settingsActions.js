import { createAction } from 'redux-actions';
import * as types from './actionTypes';
import settingsActionHandlers from './settingsActionHandlers';

export const toggleAdvancedSettings = createAction(types.TOGGLE_ADVANCED_SETTINGS);

export const fetchUISettings = settingsActionHandlers[types.FETCH_UI_SETTINGS];
export const saveUISettings = settingsActionHandlers[types.SAVE_UI_SETTINGS];
export const setUISettingsValue = createAction(types.SET_UI_SETTINGS_VALUE, (payload) => {
  return {
    section: 'ui',
    ...payload
  };
});

export const fetchMediaManagementSettings = settingsActionHandlers[types.FETCH_MEDIA_MANAGEMENT_SETTINGS];
export const saveMediaManagementSettings = settingsActionHandlers[types.SAVE_MEDIA_MANAGEMENT_SETTINGS];
export const setMediaManagementSettingsValue = createAction(types.SET_MEDIA_MANAGEMENT_SETTINGS_VALUE, (payload) => {
  return {
    section: 'mediaManagement',
    ...payload
  };
});

export const fetchNamingSettings = settingsActionHandlers[types.FETCH_NAMING_SETTINGS];
export const saveNamingSettings = settingsActionHandlers[types.SAVE_NAMING_SETTINGS];
export const setNamingSettingsValue = createAction(types.SET_NAMING_SETTINGS_VALUE, (payload) => {
  return {
    section: 'naming',
    ...payload
  };
});

export const fetchNamingExamples = settingsActionHandlers[types.FETCH_NAMING_EXAMPLES];

export const fetchQualityProfiles = settingsActionHandlers[types.FETCH_QUALITY_PROFILES];
export const fetchQualityProfileSchema = settingsActionHandlers[types.FETCH_QUALITY_PROFILE_SCHEMA];
export const saveQualityProfile = settingsActionHandlers[types.SAVE_QUALITY_PROFILE];
export const deleteQualityProfile = settingsActionHandlers[types.DELETE_QUALITY_PROFILE];

export const setQualityProfileValue = createAction(types.SET_QUALITY_PROFILE_VALUE, (payload) => {
  return {
    section: 'qualityProfiles',
    ...payload
  };
});

export const fetchDelayProfiles = settingsActionHandlers[types.FETCH_DELAY_PROFILES];
export const saveDelayProfile = settingsActionHandlers[types.SAVE_DELAY_PROFILE];
export const deleteDelayProfile = settingsActionHandlers[types.DELETE_DELAY_PROFILE];
export const reorderDelayProfile = settingsActionHandlers[types.REORDER_DELAY_PROFILE];

export const setDelayProfileValue = createAction(types.SET_DELAY_PROFILE_VALUE, (payload) => {
  return {
    section: 'delayProfiles',
    ...payload
  };
});

export const fetchQualityDefinitions = settingsActionHandlers[types.FETCH_QUALITY_DEFINITIONS];
export const saveQualityDefinitions = settingsActionHandlers[types.SAVE_QUALITY_DEFINITIONS];

export const setQualityDefinitionValue = createAction(types.SET_QUALITY_DEFINITION_VALUE);

export const fetchIndexers = settingsActionHandlers[types.FETCH_INDEXERS];
export const fetchIndexerSchema = settingsActionHandlers[types.FETCH_INDEXER_SCHEMA];
export const selectIndexerSchema = createAction(types.SELECT_INDEXER_SCHEMA);

export const saveIndexer = settingsActionHandlers[types.SAVE_INDEXER];
export const deleteIndexer = settingsActionHandlers[types.DELETE_INDEXER];
export const testIndexer = settingsActionHandlers[types.TEST_INDEXER];

export const setIndexerValue = createAction(types.SET_INDEXER_VALUE, (payload) => {
  return {
    section: 'indexers',
    ...payload
  };
});

export const setIndexerFieldValue = createAction(types.SET_INDEXER_FIELD_VALUE, (payload) => {
  return {
    section: 'indexers',
    ...payload
  };
});

export const fetchIndexerSettings = settingsActionHandlers[types.FETCH_INDEXER_SETTINGS];
export const saveIndexerSettings = settingsActionHandlers[types.SAVE_INDEXER_SETTINGS];
export const setIndexerSettingsValue = createAction(types.SET_INDEXER_SETTINGS_VALUE, (payload) => {
  return {
    section: 'indexerSettings',
    ...payload
  };
});

export const fetchRestrictions = settingsActionHandlers[types.FETCH_RESTRICTIONS];
export const saveRestriction = settingsActionHandlers[types.SAVE_RESTRICTION];
export const deleteRestriction = settingsActionHandlers[types.DELETE_RESTRICTION];

export const setRestrictionValue = createAction(types.SET_RESTRICTION_VALUE, (payload) => {
  return {
    section: 'restrictions',
    ...payload
  };
});

export const fetchDownloadClients = settingsActionHandlers[types.FETCH_DOWNLOAD_CLIENTS];
export const fetchDownloadClientSchema = settingsActionHandlers[types.FETCH_DOWNLOAD_CLIENT_SCHEMA];
export const selectDownloadClientSchema = createAction(types.SELECT_DOWNLOAD_CLIENT_SCHEMA);

export const saveDownloadClient = settingsActionHandlers[types.SAVE_DOWNLOAD_CLIENT];
export const deleteDownloadClient = settingsActionHandlers[types.DELETE_DOWNLOAD_CLIENT];
export const testDownloadClient = settingsActionHandlers[types.TEST_DOWNLOAD_CLIENT];

export const setDownloadClientValue = createAction(types.SET_DOWNLOAD_CLIENT_VALUE, (payload) => {
  return {
    section: 'downloadClients',
    ...payload
  };
});

export const setDownloadClientFieldValue = createAction(types.SET_DOWNLOAD_CLIENT_FIELD_VALUE, (payload) => {
  return {
    section: 'downloadClients',
    ...payload
  };
});
