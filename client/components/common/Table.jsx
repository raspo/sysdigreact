import _ from 'lodash';
import React, { Component, PropTypes, Children, cloneElement } from 'react';
import classNames from 'classnames';
import { SortTypes } from 'constants';
import IconUp from 'react-icons/lib/io/chevron-up';
import IconDown from 'react-icons/lib/io/chevron-down';

export function cellDataGetter(data) {
  return (rowIndex, columnKey) => {
    return data[rowIndex][columnKey];
  };
}

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

export class SortHeaderCell extends Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  _onSortChange(event) {
    event.preventDefault();

    const { onSortChange, columnKey, sortDir } = this.props;

    if (onSortChange) {
      onSortChange(columnKey, reverseSortDirection(sortDir));
    }
  }

  renderIcon() {
    const { sortDir } = this.props;
    if (!sortDir) { return null; }

    return (sortDir === SortTypes.DESC) ? <IconDown /> : <IconUp />;
  }

  render() {
    const { children } = this.props;
    return (
      <div className="table-cell table-cell--head table-cell--sortable">
        <b onClick={this._onSortChange}>{children}</b>
        {this.renderIcon()}
      </div>
    );
  }
}

SortHeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onSortChange: PropTypes.func,
  sortDir: PropTypes.oneOf([SortTypes.ASC, SortTypes.DESC]),
};


export function HeaderCell(props) {
  return (
    <div className="table-cell">{props.children}</div>
  );
}

HeaderCell.propTypes = {
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


export function TextCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell">{data}</div>
  );
}

TextCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rowIndex: PropTypes.number,
};


export function PercentageCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell table-cell--right">{data}%</div>
  );
}

PercentageCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  rowIndex: PropTypes.number
};

export function NumericCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell table-cell--right">{data}</div>
  );
}

NumericCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rowIndex: PropTypes.number,
};

export function Column() {
  return null;
}

Column.propTypes = {
  cell: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};


export function TableHead(props) {
  const { columns } = props;
  return (
    <thead className="thead">
      <tr className="thead-row">
        {
          _.map(columns, (column, index) => {
            const innerStyle = {
              width: column.props.width,
            };
            return (
              <th key={index} style={innerStyle}>
                {cloneElement(column.props.header, {
                  colIndex: index,
                  columnKey: column.props.columnKey,
                })}
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.array.isRequired,
};


export function TableBody(props) {
  const { columns, onClickRow, rowsCount } = props;
  return (
    <tbody className="tbody">
      {
        _.times(rowsCount, (rowIndex) => {
          return (
            <TableRow
              key={rowIndex}
              columns={columns}
              onClickRow={onClickRow}
              rowIndex={rowIndex}
            />
          );
        })
      }
    </tbody>
  );
}

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  onClickRow: PropTypes.func,
  rowsCount: PropTypes.number.isRequired,
};


export class TableRow extends Component {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick(event) {
    event.preventDefault();

    const { onClickRow, rowIndex } = this.props;

    if (onClickRow) {
      onClickRow(rowIndex);
    }
  }

  render() {
    const { columns, onClickRow, rowIndex } = this.props;
    const classes = classNames({
      'tbody-row': true,
      'tbody-row--clickable': !!onClickRow,
    });

    return (
      <tr className={classes} onClick={this._onClick}>
        {
          _.map(columns, (column, index) => {
            const innerStyle = {
              width: column.props.width,
            };
            return (
              <td key={index} style={innerStyle}>
                {cloneElement(column.props.cell, {
                  colIndex: index,
                  columnKey: column.props.columnKey,
                  rowIndex,
                })}
              </td>
            );
          })
        }
      </tr>
    );
  }
}

TableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  onClickRow: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
};


export function Table(props) {
  const { rowsCount, children, className, onClickRow } = props;
  const columns = Children.toArray(children);
  const classes = classNames('table__container', className);

  return (
    <div className={classes}>
      <table className="table">
        <TableHead columns={columns} />
        <TableBody rowsCount={rowsCount} columns={columns} onClickRow={onClickRow} />
      </table>
    </div>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  onClickRow: PropTypes.func,
  rowsCount: PropTypes.number.isRequired,
};
