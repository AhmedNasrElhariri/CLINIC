import React from 'react';
import { Div, CRButton, CRCard, CRTable } from 'components';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
const Data = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 24px;
`;
const DataName = styled.div`
  margin-right: 20px;
`;
const DataValue = styled.div``;

const CourseData = ({ course, onEditPaid, onEditDoctor }) => {
  const history = useHistory();
  return (
    <>
      <Div
        textAlign="right"
        border="1px solid #eef1f1"
        margin="5px"
        padding="5px"
      >
        <CRButton variant="primary" mt={2} onClick={() => onEditDoctor(course)}>
          Asign Doctor
        </CRButton>
        <CRButton
          variant="primary"
          style={{ marginTop: 4, marginLeft: 4 }}
          onClick={() => onEditPaid(course)}
        >
          Pay
        </CRButton>
        <Data>
          <DataName>Name: </DataName>
          <DataValue>{course?.courseDefinition?.name}</DataValue>
        </Data>
        <Data>
          <DataName>Price: </DataName>
          <DataValue>{course.price}</DataValue>
        </Data>
        <Data>
          <DataName>Paid: </DataName>
          <DataValue>{course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>Unpaid: </DataName>
          <DataValue>{course.price - course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>Discount: </DataName>
          <DataValue>{course.discount}</DataValue>
        </Data>
        <Data>
          <DataName>Doctor: </DataName>
          <DataValue>{course?.doctor?.name}</DataValue>
        </Data>
        <CRCard borderless>
          <CRTable
            autoHeight
            data={course.appointments}
            onRowClick={appointment => {
              history.push(`/appointments/${appointment.id}`);
            }}
          >
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }) => (
                  <CRTable.CRCellStyled bold>
                    {date.split('T')[0]}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }) => (
                  <CRTable.CRCellStyled bold>
                    {date.split('T')[1].split('.')[0]}
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
