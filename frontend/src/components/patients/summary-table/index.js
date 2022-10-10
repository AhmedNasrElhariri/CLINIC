import React from 'react';

import { CRTable } from 'components';

const SummaryTable = ({ data, fields }) => {
  return (
    <CRTable data={data}>
      {fields.map(f => (
        <CRTable.CRColumn flexGrow={1} key={f.id} fixed>
          <CRTable.CRHeaderCell>{f.name}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => <CRTable.CRCellStyled>{data[f.id]}</CRTable.CRCellStyled>}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      ))}
    </CRTable>
  );
};

SummaryTable.defaultProps = {
  data: [],
  fields: [],
};

export default SummaryTable;
