import React, { PropTypes } from 'react';
import { timestamp } from 'utils/formatter';

export default function DateTimeCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell">{timestamp(data)}</div>
  );
}

DateTimeCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rowIndex: PropTypes.number,
};
