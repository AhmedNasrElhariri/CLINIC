import React from 'react';
import NumberFormat from 'react-number-format';

import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';

function ListPatientSurgeries({ patientSurgeries }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={patientSurgeries}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Patient</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

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
                  <CRTable.CRCellStyled>
                    {formatDate(date)}
                  </CRTable.CRCellStyled>
                ) : null
              }
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Fees</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ fees }) => (
              <CRTable.CRCellStyled bold>
                <NumberFormat
                  value={fees}
                  displayType="text"
                  thousandSeparator
                />
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
          </CRTable.CRColumn>
          
        </CRTable>
      </CRCard>
    </>
  );
}

ListPatientSurgeries.defaultProps = {
  patientSurgeries: [],
};

export default ListPatientSurgeries;