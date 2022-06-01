import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';

const CourseUnitsHistory = ({ courseUnitsHistory, onEdit, courseId }) => {
  
  return (
    <CRCard borderless>
      <CRTable autoHeight data={courseUnitsHistory}>
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
          <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled bold>{user.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Units</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ units }) => (
              <CRTable.CRCellStyled bold>{units}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <CRTable.CRCellStyled bold>
                <Icon
                  icon="edit"
                  onClick={() => {
                    const newData = {
                      id: courseId,
                      units: data.units,
                      transactionId: data.id,
                    };
                    onEdit(newData);
                  }}
                >
                  {' '}
                  Edit
                </Icon>
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};

export default CourseUnitsHistory;
