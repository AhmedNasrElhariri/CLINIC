import React from 'react';

import { Div, CRTable } from 'components';
import { formatDate } from 'utils/date';

const ListSurgries = ({ surgeries, onClick }) => {
  return (
    <Div>
      <CRTable autoHeight data={surgeries} onRowClick={onClick}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Surgery</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ surgery }) => (
              <CRTable.CRCellStyled>{surgery.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Hospital</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ hospital }) => (
              <CRTable.CRCellStyled>{hospital.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) =>
              date ? (
                <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
              ) : null
            }
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </Div>
  );
};

ListSurgries.defaultProps = {
  surgries: [],
};

export default ListSurgries;
