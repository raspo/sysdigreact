import React, { PropTypes } from 'react';
import IconTags from 'react-icons/lib/io/pricetag';

export default function TagsCell(props) {
  const data = props.getData(props.rowIndex, props.columnKey);
  return (
    <div className="table-cell table-cell--tags" title={JSON.stringify(data)}>
      <IconTags width={12} />
    </div>
  );
}

TagsCell.propTypes = {
  getData: PropTypes.func.isRequired,
  columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowIndex: PropTypes.number,
};
