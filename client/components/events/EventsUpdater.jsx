import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from 'redux/actions/events';

// time in seconds to check for updates
const AUTOUPDATER_TIMEOUT = 30;

export class EventsUpdater extends Component {
  constructor(props) {
    super(props);
    this._timer = null;
  }

  componentDidMount() {
    this.scheduleUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const { lastUpdated } = this.props;

    if (lastUpdated !== 0 && lastUpdated !== nextProps.lastUpdated) {
      // there was an update, reset the timer
      this.scheduleUpdate();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.cancelUpdate();
  }

  scheduleUpdate() {
    this.cancelUpdate();
    this._timer = window.setTimeout(() => {
      this.props.fetchEvents();
    }, AUTOUPDATER_TIMEOUT * 1000);
  }

  cancelUpdate() {
    window.clearTimeout(this._timer);
    this._timer = null;
  }

  render() {
    return null;
  }
}

EventsUpdater.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  lastUpdated: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  const {
    events: { lastUpdated },
  } = state;

  return { lastUpdated };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsUpdater);
