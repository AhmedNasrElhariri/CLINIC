import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import { CRSelectInput, CRButton } from 'components';
import { usePatients, useCoursesDefinition, useCourses, useModal } from 'hooks';
import useFrom from 'hooks/form';
import ListCourses from './list-courses';
import CourseData from './course-data';
import NewCourse from '../../components/appointments/appointment/courses';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initFilter = {
  patientId: null,
  courseId: null,
  status: 'InProgress',
};
const initValue = {
  course: null,
  discount: 0,
  paid: 0,
  visaPaid: 0,
  consumed: 0,
  refund: 0,
  doctorId: null,
  sessions: [],
  startDate: null,
  branchId: null,
  specialtyId: null,
  userId: null,
  bankCreate: null,
  notes: '',
};
const inialCurrentPage = {
  activePage: 1,
};
const courseStatus = [
  { id: 'InProgress', name: 'InProgress' },
  { id: 'Finished', name: 'Finished' },
  { id: 'Cancelled', name: 'Cancelled' },
];
const Courses = () => {
  const { visible, open, close } = useModal();
  const [filter, setFilter] = useState(initFilter);
  const [course, setCourse] = useState({});
  const [header, setHeader] = useState('');
  const [bank, setBank] = useState(null);
  const [visa, setVisa] = useState(false);
  const { t } = useTranslation();
  const [sortType] = React.useState();
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const [showCourseData, setShowCourseData] = useState(false);
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const { coursesDefinitions } = useCoursesDefinition({});
  const {
    addCourse,
    courses,
    coursesCount,
    editCourse,
    editCourseDoctor,
    editCourseUnits,
    deleteCourse,
    editCoursePaymentHistory,
    users,
    loading,
    finishCourse,
    editCourseUnitHistory,
  } = useCourses({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
      setBank(null);
      setVisa(false);
    },
    onEditDoctor: () => {
      close();
      setFormValue(initValue);
    },
    onFinishCourse: () => {
      close();
      setFormValue(initValue);
      setShowCourseData(false);
      setFilter({ patientId: null, courseId: null, status: 'Finished' });
    },
    onDeleteCourse: () => {
      close();
      setFormValue(initValue);
      setShowCourseData(false);
      setFilter({ patientId: null, courseId: null, status: 'Cancelled' });
    },
    patientId: filter?.patientId,
    courseId: formValue?.id,
    page: page,
    courseID: filter.courseId,
    status: filter.status,
    sortType: sortType,
  });
  const pages = Math.ceil(coursesCount / 20);
  const handleClickEditUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('editConsumedUnits');
      setHeader(t('editConsumedUnits'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickAddUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('addNewUnits');
      setHeader(t('addNewUnits'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditPaid = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('edit');
      setHeader(t('addNewPayment'));
      setFormValue({ ...course, paid: 0, visaPaid: 0 });
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditDoctor = useCallback(
    data => {
      const course = R.pick(['id', 'doctorId'])(data);
      setType('courseDoctor');
      setHeader(t('assignNewDoctor'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleDeleteCourse = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('deleteCourse');
      setHeader(t('deleteThisCourse'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleFinishCourse = useCallback(
    course => {
      setType('finishCourse');
      setHeader(t('finishTheCourse'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditHistoryPayment = useCallback(
    data => {
      const course = R.pick(['id', 'paid', 'paymentId'])(data);
      setType('editPaymentHistory');
      setHeader(t('editHistoryPayment'));
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleClickEditUnitsHistory = useCallback(
    data => {
      const unitTransaction = R.pick(['id', 'units', 'transactionId', 'notes'])(
        data
      );
      const updatedUnitTransaction = {
        id: unitTransaction.id,
        consumed: unitTransaction.units,
        transactionId: unitTransaction.transactionId,
        notes: unitTransaction.notes,
      };
      setType('editUnitsTransactions');
      setHeader(t('editUnitTransaction'));
      setFormValue(updatedUnitTransaction);
      open();
    },
    [open, setFormValue, setType, t]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      const {
        discount,
        course,
        sessions,
        paid,
        doctorId,
        specialtyId,
        userId,
        branchId,
      } = formValue;
      const finalFormValue = {
        price: course.price - discount,
        patientId: filter.patientId,
        courseDefinitionId: course.id,
        doctorId,
        sessions,
        paid,
        discount,
        specialtyId,
        userId,
        branchId,
      };
      addCourse({
        variables: {
          course: finalFormValue,
        },
      });
    } else if (type === 'courseDoctor') {
      editCourseDoctor({
        variables: {
          courseId: formValue.id,
          doctorId: formValue.doctorId,
        },
      });
    } else if (type === 'finishCourse') {
      finishCourse({
        variables: {
          courseId: formValue.id,
        },
      });
    } else if (type === 'addNewUnits') {
      editCourseUnits({
        variables: {
          courseId: formValue.id,
          consumed: formValue.consumed,
          notes: formValue.notes,
          type: 'addNewUnits',
        },
      });
    } else if (type === 'editConsumedUnits') {
      editCourseUnits({
        variables: {
          courseId: formValue.id,
          consumed: formValue.consumed,
          type: 'editConsumedUnits',
        },
      });
    } else if (type === 'editPaymentHistory') {
      editCoursePaymentHistory({
        variables: {
          courseId: formValue.id,
          paid: formValue.paid,
          paymentId: formValue.paymentId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
          branchId: formValue.branchId,
        },
      });
    } else if (type === 'editUnitsTransactions') {
      editCourseUnitHistory({
        variables: {
          transactionId: formValue.transactionId,
          consumed: formValue.consumed,
          courseId: formValue.id,
          notes: formValue.notes,
        },
      });
    } else if (type === 'deleteCourse') {
      deleteCourse({
        variables: {
          courseId: formValue.id,
          refund: formValue.refund,
        },
      });
    } else {
      editCourse({
        variables: {
          courseId: formValue.id,
          paid: formValue.paid,
          visaPaid: formValue.visaPaid,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
          branchId: formValue.branchId,
          bank: bank,
        },
      });
    }
  }, [
    type,
    formValue,
    filter.patientId,
    addCourse,
    editCourseDoctor,
    editCourse,
    finishCourse,
    editCoursePaymentHistory,
    bank,
    deleteCourse,
    editCourseUnitHistory,
    editCourseUnits,
  ]);
  return (
    <>
      <div className="flex flex-wrap items-end gap-4 mb-5">
        {!showCourseData && (
          <Form
            formValue={filter}
            onChange={setFilter}
            className="flex flex-wrap gap-3"
          >
            <CRSelectInput
              label={t('course')}
              data={coursesDefinitions}
              name="courseId"
              placement="auto"
              style={{ width: 256 }}
            />
            <CRSelectInput
              label={t('courseStatus')}
              data={courseStatus}
              name="status"
              placement="auto"
              style={{ width: 256 }}
            />
            <CRSelectInput
              label={t('patient')}
              onSearch={v => setPatientSearchValue(v)}
              placeholder={t('patient')}
              data={searchedPatients}
              onChange={val => setFilter({ ...filter, patientId: val })}
              value={filter.patientId}
              virtualized={false}
              style={{ width: 256 }}
            />
          </Form>
        )}

        <CRButton
          onClick={() => {
            setShowCourseData(false);
            setFilter(initFilter);
          }}
        >
          {t('allCourses')}
        </CRButton>
      </div>
      <NewCourse
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        header={header}
        type={type}
        loading={loading}
        users={users}
        bank={bank}
        setBank={setBank}
        visa={visa}
        setVisa={setVisa}
      />
      {!showCourseData ? (
        <ListCourses
          courses={courses}
          setCourse={setCourse}
          setShowCourseData={setShowCourseData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      ) : (
        <CourseData
          courseId={course.id}
          courses={courses}
          onEditPaid={handleClickEditPaid}
          onEditUnits={handleClickEditUnits}
          onAddUnits={handleClickAddUnits}
          onEditDoctor={handleClickEditDoctor}
          onFinishCourse={handleFinishCourse}
          onDeleteCourse={handleDeleteCourse}
          onEditHistoryPayment={handleClickEditHistoryPayment}
          onEditUnitsHistory={handleClickEditUnitsHistory}
        />
      )}
    </>
  );
};

export default Courses;
