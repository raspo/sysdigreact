import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { SortTypes } from 'constants';
import {
  Table,
  Column,
  HeaderCell,
  SortHeaderCell,
  TextCell,
  NumericCell,
  cellDataGetter,
} from 'components/common/Table';
import Loading from 'components/common/Loading';
import TagsCell from 'components/events/TagsCell';
import DescCell from 'components/events/DescCell';
import DateTimeCell from 'components/events/DateTimeCell';

export default class EventsTable extends Component {
  constructor(props) {
    super(props);

    this.state = this.initializeState(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initializeState(nextProps));
  }

  initializeState(props) {
    return {
      sortedDataset: props.dataset,
      colSortDirs: {},
    };
  }

  _onSortChange(columnKey, sortDir) {
    let sortedDataset = _.sortBy(this.state.sortedDataset, columnKey);
    sortedDataset = sortDir === SortTypes.DESC ? sortedDataset.reverse() : sortedDataset;

    this.setState({
      sortedDataset,
      colSortDirs: { [columnKey]: sortDir },
    });
  }

  render() {
    const { isFetching } = this.props;
    const { sortedDataset, colSortDirs } = this.state;

    if (isFetching) {
      return (
        <div className="card">
          <Loading />
        </div>
      );
    }

    return (
      <div className="card">
        <Table rowsCount={sortedDataset.length}>
          <Column
            columnKey="id"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.id}
              >ID</SortHeaderCell>
            }
            cell={<TextCell getData={cellDataGetter(sortedDataset)} />}
            width={170}
          />
          <Column
            columnKey="name"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.name}
              >Name</SortHeaderCell>
            }
            cell={<TextCell getData={cellDataGetter(sortedDataset)} />}
            width={150}
          />
          <Column
            columnKey="description"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.description}
              >Description</SortHeaderCell>
            }
            cell={<DescCell getData={cellDataGetter(sortedDataset)} />}
            width={326}
          />
          <Column
            columnKey="severity"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.severity}
              >Severity</SortHeaderCell>
            }
            cell={<NumericCell getData={cellDataGetter(sortedDataset)} />}
            width={95}
          />
          <Column
            columnKey="timestamp"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.timestamp}
              >Timestamp</SortHeaderCell>
            }
            cell={<DateTimeCell getData={cellDataGetter(sortedDataset)} />}
            width={175}
          />
          <Column
            columnKey="tags"
            header={
              <HeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.tags}
              >Tags</HeaderCell>
            }
            cell={<TagsCell getData={cellDataGetter(sortedDataset)} />}
          />
        </Table>
      </div>
    );
  }
}

EventsTable.propTypes = {
  dataset: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
