import * as types from './actionTypes';
import wantedActionHandlers from './wantedActionHandlers';

//
// Missing

export const fetchMissing = wantedActionHandlers[types.FETCH_MISSING];
export const gotoMissingFirstPage = wantedActionHandlers[types.GOTO_FIRST_MISSING_PAGE];
export const gotoMissingPreviousPage = wantedActionHandlers[types.GOTO_PREVIOUS_MISSING_PAGE];
export const gotoMissingNextPage = wantedActionHandlers[types.GOTO_NEXT_MISSING_PAGE];
export const gotoMissingLastPage = wantedActionHandlers[types.GOTO_LAST_MISSING_PAGE];
export const gotoMissingPage = wantedActionHandlers[types.GOTO_MISSING_PAGE];
export const setMissingSort = wantedActionHandlers[types.SET_MISSING_SORT];
export const setMissingFilter = wantedActionHandlers[types.SET_MISSING_FILTER];

export const batchUnmonitorMissingEpisodes = wantedActionHandlers[types.BATCH_UNMONITOR_MISSING_EPISODES];

//
// Cutoff Unmet

export const fetchCutoffUnmet = wantedActionHandlers[types.FETCH_CUTOFF_UNMET];
export const gotoCutoffUnmetFirstPage = wantedActionHandlers[types.GOTO_FIRST_CUTOFF_UNMET_PAGE];
export const gotoCutoffUnmetPreviousPage = wantedActionHandlers[types.GOTO_PREVIOUS_CUTOFF_UNMET_PAGE];
export const gotoCutoffUnmetNextPage = wantedActionHandlers[types.GOTO_NEXT_CUTOFF_UNMET_PAGE];
export const gotoCutoffUnmetLastPage = wantedActionHandlers[types.GOTO_LAST_CUTOFF_UNMET_PAGE];
export const gotoCutoffUnmetPage = wantedActionHandlers[types.GOTO_CUTOFF_UNMET_PAGE];
export const setCutoffUnmetSort = wantedActionHandlers[types.SET_CUTOFF_UNMET_SORT];
export const setCutoffUnmetFilter = wantedActionHandlers[types.SET_CUTOFF_UNMET_FILTER];

export const batchUnmonitorCutoffUnmetEpisodes = wantedActionHandlers[types.BATCH_UNMONITOR_CUTOFF_UNMET_EPISODES];
