import { combineReducers } from 'redux';

import events from 'redux/reducers/events';

const rootReducer = combineReducers({
  events,
});

export default rootReducer;
