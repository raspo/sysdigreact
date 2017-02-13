import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  EVENTS_FETCH_START,
  EVENTS_FETCH_SUCCESS,
} from 'redux/action-types';

export function eventsIds(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case EVENTS_FETCH_SUCCESS:
      return _.map(payload.entities, entity => entity.id);
    default:
      return state;
  }
}

export function eventsById(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case EVENTS_FETCH_SUCCESS:
      return _.reduce(payload.entities, (result, entity) => {
        result[entity.id] = _.assign({}, state[entity.id], entity);
        return result;
      }, {});
    default:
      return state;
  }
}

export function isFetching(state = false, action) {
  const { type } = action;

  switch (type) {
    case EVENTS_FETCH_START:
      return true;
    case EVENTS_FETCH_SUCCESS:
      return false;
    default:
      return state;
  }
}

export function lastUpdated(state = 0, action) {
  const { type, payload } = action;

  switch (type) {
    case EVENTS_FETCH_SUCCESS:
      return payload.timestamp;
    default:
      return state;
  }
}

export default combineReducers({
  eventsIds,
  eventsById,
  isFetching,
  lastUpdated,
});
