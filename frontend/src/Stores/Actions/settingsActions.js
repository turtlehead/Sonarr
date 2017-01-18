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

export const fetchNamingSettings = settingsActionHandlers[types.FETCH_NAMING_SETTINGS];
export const saveNamingSettings = settingsActionHandlers[types.SAVE_NAMING_SETTINGS];
export const setNamingSettingsValue = createAction(types.SET_NAMING_SETTINGS_VALUE, (payload) => {
  return {
    section: 'naming',
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
