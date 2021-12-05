import React from 'react';
import CRCell from './cell';
import { formatDate } from 'utils/date';

const CRDateCell = ({ format, ...props }) => (
  <CRCell
    getValue={(val, data, dataKey) => {
      return formatDate(val);
    }}
    {...props}
  ></CRCell>
);

export default CRDateCell;
