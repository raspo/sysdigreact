import _ from 'lodash';

function normalizeEvent(event = {}) {
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    severity: event.severity,
    timestamp: event.timestamp * 1000,
    tags: event.tags,
  };
}

export function normalizeEventsData(data = []) {
  return _.map(data, event => normalizeEvent(event));
}
