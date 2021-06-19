import React from 'react';
import { CRCard,CRTable } from 'components';
import { formatDate } from 'utils/date';
const CoursePayment = ({ sessions,handleClick }) => {
  return (
    <CRCard borderless>
      <CRTable
        autoHeight
        data={sessions}
        onRowClick={appointment => {
          handleClick(appointment);
        }}
      >
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Number</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({}, indx) => (
              <CRTable.CRCellStyled bold>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled bold>
                {formatDate(date, 'dddd, DD-MM-YYYY')}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled bold>
                {formatDate(date, 'hh : mm a')}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Status</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ status }) => (
              <CRTable.CRCellStyled bold>{status}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};

export default CoursePayment;
