import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import CoursePayment from '../appointments/appointment/courses/course-payment-history';
import CourseSession from '../appointments/appointment/courses/course-sessions';
import CourseUnitsHistoryPage from '../appointments/appointment/courses/course-units-history';
import * as moment from 'moment';
import * as R from 'ramda';
import { Div, CRButton, CRTabs } from 'components';
import { useCourses } from 'hooks';
import {
  Data,
  DataName,
  DataValue,
} from '../appointments/appointment/courses/style';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';

const sortByDate = R.sortBy(R.compose(R.prop('date')));
const CourseData = ({
  courseId,
  courses,
  onEditPaid,
  onEditDoctor,
  onFinishCourse,
  onEditUnits,
  onAddUnits,
  onDeleteCourse,
  onEditHistoryPayment,
  onEditUnitsHistory,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const course = useMemo(() => {
    const filteredCourses = courses.filter(c => c.id === courseId);
    return filteredCourses[0];
  }, [courseId, courses]);
  let { sessions } = course;
  const updatedSessions = sortByDate(sessions);
  const { coursePayments, courseUnitsHistory } = useCourses({
    courseId: course.id,
  });
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
            {t('deleteThisCourse')}
          </CRButton>
        )}
        <CRButton
          variant="primary"
          mt={2}
          mr={1}
          onClick={() => onEditDoctor(course)}
        >
          {t('assignDoctor')}
        </CRButton>
        {course.price > course.paid && course.status === 'InProgress' && (
          <CRButton variant="primary" mr={1} onClick={() => onEditPaid(course)}>
            {t('pay')}
          </CRButton>
        )}
        {course.type === 'Perunit' && (
          <CRButton variant="primary" mr={1} onClick={() => onAddUnits(course)}>
            {t('addUnits')}
          </CRButton>
        )}
        {course.type === 'Perunit' && (
          <CRButton
            variant="primary"
            mr={1}
            onClick={() => onEditUnits(course)}
          >
            {t('editUnits')}
          </CRButton>
        )}
        <CRButton
          variant="danger"
          onClick={() => {
            onFinishCourse(course);
          }}
        >
          {t('finish')}
        </CRButton>
        <Data>
          <DataName>{t('name')} : </DataName>
          <DataValue>{course?.name}</DataValue>
        </Data>
        <Data>
          <DataName>{t('price')} : </DataName>
          <DataValue>{course.price}</DataValue>
        </Data>
        <Data>
          <DataName>{t('paid')} : </DataName>
          <DataValue>{course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>{t('courseUnpaid')} : </DataName>
          <DataValue>{course.price - course.paid}</DataValue>
        </Data>
        <Data>
          <DataName>{t('discount')} : </DataName>
          <DataValue>{course.discount}</DataValue>
        </Data>
        <Data>
          <DataName>{t('doctor')} : </DataName>
          <DataValue>{course?.doctor?.name}</DataValue>
        </Data>
        <Data>
          <DataName>{t('creator')} : </DataName>
          <DataValue>{course?.user?.name}</DataValue>
        </Data>
        <Data>
          <DataName>{t('status')} : </DataName>
          <DataValue>{course.status}</DataValue>
        </Data>
        {course.type === 'Perunit' && (
          <>
            <Data>
              <DataName>{t('totalOfUnits')} : </DataName>
              <DataValue>{course.units}</DataValue>
            </Data>
            <Data>
              <DataName>{t('consumed')}: </DataName>
              <DataValue>{course.consumed}</DataValue>
            </Data>
            <Data>
              <DataName>{t('remaining')}: </DataName>
              <DataValue>{course.units - course.consumed}</DataValue>
            </Data>
          </>
        )}
        <Data>
          <DataName>{t('startDate')} : </DataName>
          <DataValue>
            {formatDate(course.startDate, 'dddd, DD-MM-YYYY')}
          </DataValue>
        </Data>
        <Data>
          <DataName>{t('endOfDate')} : </DataName>
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
              <CRTabs.CRTab>{t('courseSession')}</CRTabs.CRTab>
              <CRTabs.CRTab>{t('coursePaymentHistory')}</CRTabs.CRTab>
              <CRTabs.CRTab>{t('courseUnitsHistory')}</CRTabs.CRTab>
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
              <CRTabs.CRContent>
                <CourseUnitsHistoryPage
                  courseUnitsHistory={courseUnitsHistory}
                  onEdit={onEditUnitsHistory}
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
