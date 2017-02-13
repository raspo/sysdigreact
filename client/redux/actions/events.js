import {
  EVENTS_FETCH_START,
  EVENTS_FETCH_SUCCESS,
} from 'redux/action-types';
import { normalizeEventsData } from 'utils/normalizers';

function fetchEventsStart() {
  return { type: EVENTS_FETCH_START };
}

export function fetchEvents() {
  return (dispatch) => {
    dispatch(fetchEventsStart());

    fetch('https://app-staging.sysdigcloud.com/api/events', {
      method: 'GET',
      mode: 'CORS',
      headers: {
        Authorization: 'Bearer 8aef9517-3070-4090-b55e-83296cee8cd1',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.text().then((text) => {
        const data = JSON.parse(text);
        return normalizeEventsData(data.events);
      });
    })
    .then((result) => {
      dispatch({
        type: EVENTS_FETCH_SUCCESS,
        payload: {
          entities: result,
          timestamp: Date.now(),
        },
      });
    });
  };
}
