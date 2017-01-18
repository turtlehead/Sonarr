import $ from 'jquery';
import serverSideCollectionHandlers from 'Utilities/serverSideCollectionHandlers';
import createFetchHandler from './Creators/createFetchHandler';
import createServerSideCollectionHandlers from './Creators/createServerSideCollectionHandlers';
import * as types from './actionTypes';
import { updateItem } from './baseActions';
import { fetchQueue } from './queueActions';

const queueActionHandlers = {
  [types.FETCH_QUEUE_STATUS]: createFetchHandler('status', '/queue/status'),
  [types.FETCH_QUEUE_DETAILS]: createFetchHandler('details', '/queue/details'),

  ...createServerSideCollectionHandlers('paged', '/queue', (state) => state.queue, {
    [serverSideCollectionHandlers.FETCH]: types.FETCH_QUEUE,
    [serverSideCollectionHandlers.FIRST_PAGE]: types.GOTO_FIRST_QUEUE_PAGE,
    [serverSideCollectionHandlers.PREVIOUS_PAGE]: types.GOTO_PREVIOUS_QUEUE_PAGE,
    [serverSideCollectionHandlers.NEXT_PAGE]: types.GOTO_NEXT_QUEUE_PAGE,
    [serverSideCollectionHandlers.LAST_PAGE]: types.GOTO_LAST_QUEUE_PAGE,
    [serverSideCollectionHandlers.EXACT_PAGE]: types.GOTO_QUEUE_PAGE,
    [serverSideCollectionHandlers.SORT]: types.SET_QUEUE_SORT
  }),

  [types.REMOVE_QUEUE_ITEM]: function(payload) {
    const section = 'paged';

    const {
      id,
      blacklist
    } = payload;

    return function(dispatch, getState) {
      dispatch(updateItem({ section, id, removing: true }));

      const promise = $.ajax({
        url: `/queue/${id}?blacklist=${blacklist}`,
        type: 'DELETE'
      });

      promise.done((data) => {
        dispatch(fetchQueue());
      });

      promise.fail((xhr) => {
        dispatch(updateItem({ section, id, removing: false }));
      });
    };
  },

  [types.GRAB_QUEUE_ITEM]: function(payload) {
    const section = 'paged';

    const {
      id
    } = payload;

    return function(dispatch, getState) {
      dispatch(updateItem({ section, id, grabbing: true }));

      const promise = $.ajax({
        url: `/queue/grab/${id}`,
        type: 'POST'
      });

      promise.done((data) => {
        dispatch(fetchQueue());
      });

      promise.fail((xhr) => {
        dispatch(updateItem({ section, id, grabbing: false }));
      });
    };
  }
};

export default queueActionHandlers;
