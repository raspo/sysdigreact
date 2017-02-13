import React, { PropTypes } from 'react';

export default function DescCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell table-cell--desc" title={data}>{data}</div>
  );
}

DescCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rowIndex: PropTypes.number,
};
