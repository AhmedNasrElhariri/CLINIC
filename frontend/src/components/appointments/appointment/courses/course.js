import React from 'react';
import { useHistory } from 'react-router-dom';

import { Div, CRButton, CRCard, CRTable } from 'components';
import { Data, DataName, DataValue } from './style';

import { formatDate } from 'utils/date';

const CourseData = ({ course, onEditPaid, onEditDoctor }) => {
  const history = useHistory();
  return (
    <>
      <Div textAlign="right" border="1px solid #eef1f1" m="5px" p="5px">
        <CRButton variant="primary" mt={2} mr={1} onClick={() => onEditDoctor(course)}>
          Assign Doctor
        </CRButton>
        <CRButton variant="primary" onClick={() => onEditPaid(course)}>
          Pay
        </CRButton>
        <Data>
          <DataName>Name : </DataName>
          <DataValue>{course?.courseDefinition?.name}</DataValue>
        </Data>
        <Data>
          <DataName>Price : </DataName>
          <DataValue>{course.price}</DataValue>
        </Data>
        <Data>
          <DataName>Paid : </DataName>
          <DataValue>{course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>Unpaid : </DataName>
          <DataValue>{course.price - course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>Discount : </DataName>
          <DataValue>{course.discount}</DataValue>
        </Data>
        <Data>
          <DataName>Doctor : </DataName>
          <DataValue>{course?.doctor?.name}</DataValue>
        </Data>
        <CRCard borderless>
          <CRTable
            autoHeight
            data={course.sessions}
            onRowClick={appointment => {
              history.push(`/appointments/${appointment.id}`);
            }}
          >
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
          </CRTable>
        </CRCard>
      </Div>
    </>
  );
};
export default CourseData;
