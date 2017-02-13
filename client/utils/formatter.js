import moment from 'moment';

export function pluralize(count, singular, plural) {
  return (count === 1) ? singular : (plural || `${singular}s`);
}

export function time(timestamp) {
  return moment(timestamp).format('h:mm:ss a');
}

export function timestamp(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD h:mm:ss a');
}
