import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import CoursePayment from '../appointments/appointment/courses/course-payment-history';
import CourseSession from '../appointments/appointment/courses/course-sessions';
import CourseUnitsHistoryPage from '../appointments/appointment/courses/course-units-history';
import * as moment from 'moment';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import { useCourses } from 'hooks';
import {
  Data,
  DataName,
  DataValue,
} from '../appointments/appointment/courses/style';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import { Nav } from 'rsuite';
import { useCallback } from 'react';
import { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState(0);

  const onSelect = useCallback(k => {
    setActiveTab(k);
  }, []);

  return (
    <>
      <Div border="1px solid #eef1f1" m="5px" p="5px">
        <div className="flex flex-wrap gap-1 items-center m-2">
          {course.status !== 'Cancelled' && course.status !== 'Rejected' && (
            <CRButton variant="primary" onClick={() => onDeleteCourse(course)}>
              {t('deleteThisCourse')}
            </CRButton>
          )}
          <CRButton variant="primary" onClick={() => onEditDoctor(course)}>
            {t('assignDoctor')}
          </CRButton>
          {course.price > course.paid && course.status === 'InProgress' && (
            <CRButton variant="primary" onClick={() => onEditPaid(course)}>
              {t('pay')}
            </CRButton>
          )}
          {course.type === 'Perunit' && (
            <CRButton variant="primary" onClick={() => onAddUnits(course)}>
              {t('consumeUnits')}
            </CRButton>
          )}
          {course.type === 'Perunit' && (
            <CRButton variant="primary" onClick={() => onEditUnits(course)}>
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
        </div>
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

        <Nav
          onSelect={onSelect}
          justified
          activeKey={activeTab}
          appearance="tabs"
          className="my-5 text-center"
        >
          <Nav.Item eventKey={0}>{t('courseSession')}</Nav.Item>
          <Nav.Item eventKey={1}>{t('coursePaymentHistory')}</Nav.Item>
          <Nav.Item eventKey={2}>{t('courseUnitsHistory')}</Nav.Item>
        </Nav>

        {activeTab === 0 && (
          <CourseSession sessions={updatedSessions} handleClick={handleClick} />
        )}

        {activeTab === 1 && (
          <CoursePayment
            coursePayments={coursePayments}
            onEdit={onEditHistoryPayment}
            courseId={course.id}
          />
        )}

        {activeTab === 2 && (
          <CourseUnitsHistoryPage
            courseUnitsHistory={courseUnitsHistory}
            onEdit={onEditUnitsHistory}
            courseId={course.id}
          />
        )}
      </Div>
    </>
  );
};
export default CourseData;
