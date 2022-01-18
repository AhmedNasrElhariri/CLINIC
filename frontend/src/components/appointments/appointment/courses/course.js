import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import CoursePayment from './course-payment-history';
import CourseSession from './course-sessions';
import * as moment from 'moment';
import * as R from 'ramda';
import { Div, CRButton, CRTabs } from 'components';
import { useCourses } from 'hooks';
import { Data, DataName, DataValue } from './style';
import { formatDate } from 'utils/date';
const sortByDate = R.sortBy(R.compose(R.prop('date')));
const CourseData = ({
  courses,
  indx,
  onEditPaid,
  onEditDoctor,
  onFinishCourse,
  onEditUnits,
  onAddUnits,
  onDeleteCourse,
  onEditHistoryPayment,
}) => {
  const history = useHistory();
  let course = courses[indx];
  let { sessions } = course;
  const updatedSessions = sortByDate(sessions);
  const { coursePayments } = useCourses({ courseId: course.id });
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
        {course.status !== 'Cancelled' && course.status !== 'Rejected' && (
          <CRButton
            variant="primary"
            mt={2}
            mr={1}
            onClick={() => onDeleteCourse(course)}
          >
            Cancel This Course
          </CRButton>
        )}
        <CRButton
          variant="primary"
          mt={2}
          mr={1}
          onClick={() => onEditDoctor(course)}
        >
          Assign Doctor
        </CRButton>
        {course.price > course.paid && course.status === 'InProgress' && (
          <CRButton variant="primary" mr={1} onClick={() => onEditPaid(course)}>
            Pay
          </CRButton>
        )}
        {course.courseDefinition.type === 'Perunit' && (
          <CRButton variant="primary" mr={1} onClick={() => onAddUnits(course)}>
            Add Units
          </CRButton>
        )}
        {course.courseDefinition.type === 'Perunit' && (
          <CRButton
            variant="primary"
            mr={1}
            onClick={() => onEditUnits(course)}
          >
            Edit Units
          </CRButton>
        )}
        {course.status === 'InProgress' && (
          <CRButton variant="danger" onClick={() => onFinishCourse(course)}>
            Finish
          </CRButton>
        )}
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
          <DataName>Creator : </DataName>
          <DataValue>{course?.user?.name}</DataValue>
        </Data>
        <Data>
          <DataName>status : </DataName>
          <DataValue>{course.status}</DataValue>
        </Data>
        {course.courseDefinition.type === 'Perunit' && (
          <>
            <Data>
              <DataName>Total of Units : </DataName>
              <DataValue>{course.courseDefinition.units}</DataValue>
            </Data>
            <Data>
              <DataName>Consumed: </DataName>
              <DataValue>{course.consumed}</DataValue>
            </Data>
            <Data>
              <DataName>Remaining: </DataName>
              <DataValue>
                {course.courseDefinition.units - course.consumed}
              </DataValue>
            </Data>
          </>
        )}
        <Data>
          <DataName>Start of Date : </DataName>
          <DataValue>
            {formatDate(course.startDate, 'dddd, DD-MM-YYYY')}
          </DataValue>
        </Data>
        <Data>
          <DataName>End of Date : </DataName>
          {course.status !== 'InProgress' ? (
            <DataValue>
              {formatDate(course.endDate, 'dddd, DD-MM-YYYY')}
            </DataValue>
          ) : (
            ''
          )}
        </Data>
        <Div textAlign="left" mt={20}>
          <CRTabs>
            <CRTabs.CRTabsGroup>
              <CRTabs.CRTab>Course Session</CRTabs.CRTab>
              <CRTabs.CRTab>Course Payment History</CRTabs.CRTab>
            </CRTabs.CRTabsGroup>
            <CRTabs.CRContentGroup>
              <CRTabs.CRContent>
                <CourseSession
                  sessions={updatedSessions}
                  handleClick={handleClick}
                />
              </CRTabs.CRContent>
              <CRTabs.CRContent>
                <CoursePayment
                  coursePayments={coursePayments}
                  onEdit={onEditHistoryPayment}
                  courseId={course.id}
                />
              </CRTabs.CRContent>
            </CRTabs.CRContentGroup>
          </CRTabs>
        </Div>
      </Div>
    </>
  );
};
export default CourseData;
