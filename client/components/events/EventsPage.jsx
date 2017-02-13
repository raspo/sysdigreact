import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from 'redux/actions/events';
import EventsUpdater from 'components/events/EventsUpdater';
import EventsSummary from 'components/events/EventsSummary';
import EventsTable from 'components/events/EventsTable';

export class EventsPage extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events, isFetching, lastUpdated } = this.props;

    return (
      <div className="container cards__container">
        <div className="card">
          <div className="card-section">
            <EventsSummary
              data={events}
              lastUpdated={lastUpdated}
              onRefresh={this.props.fetchEvents}
            />
          </div>
        </div>
        <EventsTable dataset={events} isFetching={isFetching} />
        <EventsUpdater />
      </div>
    );
  }
}

EventsPage.propTypes = {
  events: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const {
    events: {
      eventsIds,
      eventsById,
      isFetching,
      lastUpdated,
    },
  } = state;

  return {
    events: _.map(eventsIds, id => eventsById[id]),
    isFetching,
    lastUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
