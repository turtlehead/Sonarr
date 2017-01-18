import _ from 'lodash';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';

const whitelistedProperties = [
  'fetching',
  'populated',
  'error',
  'saving',
  'saveError',
  'testing',
  'deleting',
  'deleteError',
  'pendingChanges',
  'filterKey',
  'filterValue',
  'page',
  'sortKey',
  'sortDirection'
];

function createSetReducer(section) {
  return (state, { payload }) => {
    if (section === payload.section) {
      const newState = Object.assign(getSectionState(state, section),
                                     _.pick(payload, whitelistedProperties));

      return updateSectionState(state, section, newState);
    }

    return state;
  };
}

export default createSetReducer;
