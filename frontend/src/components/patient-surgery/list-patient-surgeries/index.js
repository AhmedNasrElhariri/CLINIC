import React from 'react';
import NumberFormat from 'react-number-format';

import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';

function ListPatientSurgeries({ patientSurgeries, onSurgeryClick }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={patientSurgeries} onRowClick={onSurgeryClick}>
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
            <CRTable.CRHeaderCell>Anesthesia Type</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesia }) => (
                <CRTable.CRCellStyled>{anesthesia}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Anesthesia Doctor Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesiaDoctorName }) => (
                <CRTable.CRCellStyled>
                  {anesthesiaDoctorName}
                </CRTable.CRCellStyled>
              )}
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

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Hospital Fees</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ hospitalFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={hospitalFees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Assistant Fees</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ assistantFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={assistantFees}
                    displayType="text"
                    thousandSeparator
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Anesthesia Fees</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ anesthesiaFees }) => (
                <CRTable.CRCellStyled bold>
                  <NumberFormat
                    value={anesthesiaFees}
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
