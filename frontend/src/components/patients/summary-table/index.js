import React from 'react';

import { CRTable, Div } from 'components';

const SummaryTable = ({ data, fields }) => {
  console.log(data);
  return (
    <Div>
      <CRTable autoHeight data={data}>
        {fields.map(f => (
          <CRTable.CRColumn flexGrow={1} key={f.id}>
            <CRTable.CRHeaderCell>{f.name}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled>{data[f.id]}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        ))}
      </CRTable>
    </Div>
  );
};

SummaryTable.defaultProps = {
  data: [],
  fields: [],
};

export default SummaryTable;
