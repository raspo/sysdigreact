import React, { PropTypes } from 'react';
import { pluralize, time } from 'utils/formatter';

export default function EventsSummary(props) {
  const { data, lastUpdated, onRefresh } = props;

  return (
    <div className="card-content events-summary">
      <p>Currently displaying <strong>{data.length} {pluralize(data.length, 'event')}</strong>. <em>Last updated at {time(lastUpdated)}</em></p>

      <button className="btn btn--brand" onClick={onRefresh}>Refresh Now</button>
    </div>
  );
}

EventsSummary.propTypes = {
  data: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
