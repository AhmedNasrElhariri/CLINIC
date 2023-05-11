import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CoursePayment from './course-payment-history';
import CourseUnitsHistoryPage from './course-units-history';
import CourseSession from './course-sessions';
import * as moment from 'moment';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import { useCourses } from 'hooks';
import { Data, DataName, DataValue } from './style';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import ListCourseParts from './list-course-parts';
import { Nav } from 'rsuite';

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
  onEditUnitsHistory,
  courseParts,
  onActiveCourse,
}) => {
  const history = useHistory();
  const [active, setActive] = React.useState('courseSession');
  const { t } = useTranslation();
  let course = courses[indx];
  let sessions = course?.sessions || [];
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
  useEffect(() => {
    onActiveCourse && onActiveCourse(course?.id || null);
  }, [onActiveCourse, course]);
  return (
    <Fragment>
      {course && (
        <Div border="1px solid #eef1f1" m="5px" p="5px">
          {course.status !== 'Cancelled' && course.status !== 'Rejected' && (
            <CRButton
              variant="primary"
              mt={2}
              mr={1}
              onClick={() => onDeleteCourse(course)}
            >
              {t('cancelThisCourse')}
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
            <CRButton
              variant="primary"
              mr={1}
              onClick={() => onEditPaid(course)}
            >
              {t('pay')}
            </CRButton>
          )}

          {(course.type === 'Perunit' || course.type === 'Custom') &&
            course.units - course.consumed > 0 && (
              <CRButton
                variant="primary"
                mr={1}
                onClick={() => onAddUnits(course)}
              >
                {t('consumeUnits')}
              </CRButton>
            )}
          {(course.type === 'Perunit' || course.type === 'Custom') && (
            <CRButton
              variant="primary"
              mr={1}
              onClick={() => onEditUnits(course)}
            >
              {courseParts && courseParts.length > 0
                ? t('editUnits')
                : t('editConsumedUnits')}
            </CRButton>
          )}
          {course.status === 'InProgress' && (
            <CRButton
              variant="danger"
              onClick={() => onFinishCourse(course)}
              mr={1}
              ml={1}
            >
              {t('finish')}
            </CRButton>
          )}
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
          {(course.type === 'Perunit' || course.type === 'Custom') && (
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
          <Div mt={20}>
            <Nav
              onSelect={setActive}
              appearance="tabs"
              justified
              className="text-center mb-5"
              activeKey={active}
              style={{ borderBottom: '1px solid #d9d9d9' }}
            >
              <Nav.Item eventKey="courseSession">{t('courseSession')}</Nav.Item>
              <Nav.Item eventKey="coursePaymentHistory">
                {t('coursePaymentHistory')}
              </Nav.Item>
              <Nav.Item eventKey="courseUnitsHistory">
                {t('courseUnitsHistory')}
              </Nav.Item>
              <Nav.Item eventKey="courseParts">{t('courseParts')}</Nav.Item>
            </Nav>
            {active === 'courseSession' && (
              <CourseSession
                sessions={updatedSessions}
                handleClick={handleClick}
              />
            )}
            {active === 'coursePaymentHistory' && (
              <CoursePayment
                coursePayments={coursePayments}
                onEdit={onEditHistoryPayment}
                courseId={course.id}
              />
            )}
            {active === 'courseUnitsHistory' && (
              <CourseUnitsHistoryPage
                courseUnitsHistory={courseUnitsHistory}
                onEdit={onEditUnitsHistory}
                courseId={course.id}
              />
            )}
            {active === 'courseParts' && (
              <ListCourseParts parts={courseParts} t={t} />
            )}
          </Div>
        </Div>
      )}
    </Fragment>
  );
};
export default CourseData;
