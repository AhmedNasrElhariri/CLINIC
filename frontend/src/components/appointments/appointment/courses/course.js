import React from 'react';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import * as R from 'ramda';
import { Div, CRButton, CRCard, CRTable } from 'components';
import { Data, DataName, DataValue } from './style';

import { formatDate } from 'utils/date';
const sortByDate = R.sortBy(R.compose(R.prop('date')));
const CourseData = ({
  courses,
  indx,
  onEditPaid,
  onEditDoctor,
  onFinishCourse,
}) => {
  const history = useHistory();
  let course = courses[indx];
  let sessions = sortByDate(course.sessions);
  const handleClick = appointment => {
    if (
      moment(new Date()).endOf('day').toDate() >
      moment(appointment.date).toDate()
    ) {
      history.push(`/appointments/${appointment.id}`);
    }
  };
  return (
    <>
      <Div textAlign="right" border="1px solid #eef1f1" m="5px" p="5px">
        <CRButton
          variant="primary"
          mt={2}
          mr={1}
          onClick={() => onEditDoctor(course)}
        >
          Assign Doctor
        </CRButton>
        <CRButton variant="primary" mr={1} onClick={() => onEditPaid(course)}>
          Pay
        </CRButton>
        <CRButton variant="danger" onClick={() => onFinishCourse(course)}>
          Finish
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
        <Data>
          <DataName>status : </DataName>
          <DataValue>{course.status}</DataValue>
        </Data>
        <Data>
          <DataName>Start of Date : </DataName>
          <DataValue>
            {formatDate(course.startDate, 'dddd, DD-MM-YYYY')}
          </DataValue>
        </Data>
        <Data>
          <DataName>End of Date : </DataName>
          <DataValue>
            {formatDate(course.endDate, 'dddd, DD-MM-YYYY')}
          </DataValue>
        </Data>
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
      </Div>
    </>
  );
};
export default CourseData;
