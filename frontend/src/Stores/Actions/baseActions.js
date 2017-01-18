import { createAction } from 'redux-actions';
import * as types from './actionTypes';

export const set = createAction(types.SET);

export const update = createAction(types.UPDATE);
export const updateThingy = createAction(types.UPDATE_THINGY);
export const updateServerSideCollection = createAction(types.UPDATE_SERVER_SIDE_COLLECTION);

export const setSettingValue = createAction(types.SET_SETTING_VALUE);
export const clearPendingChanges = createAction(types.CLEAR_PENDING_CHANGES);

export const deleteThingy = createAction(types.DELETE_THINGY);
