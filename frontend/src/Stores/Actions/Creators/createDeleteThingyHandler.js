import $ from 'jquery';
import { set, deleteThingy } from '../baseActions';

function createDeleteThingyHandler(section, thingySection, url, getFromState, getThingiesFromState) {
  return function(payload) {
    return function(dispatch, getState) {
      dispatch(set({ section, deleting: true }));

      const id = payload.id;

      const ajaxOptions = {
        url: `${url}/${id}`,
        method: 'DELETE'
      };

      const promise = $.ajax(ajaxOptions);

      promise.done((data) => {
        dispatch(deleteThingy({ section: thingySection, id }));

        dispatch(set({
          section,
          deleting: false,
          deleteError: null
        }));
      });

      promise.fail((xhr) => {
        dispatch(set({
          section,
          deleting: false,
          deleteError: xhr
        }));
      });
    };
  };
}

export default createDeleteThingyHandler;
