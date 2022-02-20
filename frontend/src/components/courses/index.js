import React, { useMemo, useCallback, useState } from 'react';
import * as R from 'ramda';
import { CRSelectInput, Div, CRButton } from 'components';
import { usePatients, useCoursesDefinition, useCourses, useModal } from 'hooks';
import useFrom from 'hooks/form';
import ListCourses from './list-courses';
import CourseData from './course-data';
import NewCourse from '../../components/appointments/appointment/courses';
import { Form } from 'rsuite';
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
  bankCreate:null,
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
  const [sortType, setSortType] = React.useState();
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
      setHeader('Edit Consumed Units');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickAddUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('addNewUnits');
      setHeader('Add New Units');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditPaid = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('edit');
      setHeader('Add New Payment');
      setFormValue({ ...course, paid: 0, visaPaid: 0 });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditDoctor = useCallback(
    data => {
      const course = R.pick(['id', 'doctorId'])(data);
      setType('courseDoctor');
      setHeader('Assign New Doctor');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleDeleteCourse = useCallback(
    data => {
      const course = R.pick(['id'])(data);
      setType('deleteCourse');
      setHeader('Delete The Course');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleFinishCourse = useCallback(
    course => {
      setType('finishCourse');
      setHeader('Finish the course');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditHistoryPayment = useCallback(
    data => {
      const course = R.pick(['id', 'paid', 'paymentId'])(data);
      setType('editPaymentHistory');
      setHeader('Edit History Payment');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
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
  ]);
  return (
    <>
      <Div mb={50} display="flex" justifyContent="space-around">
        {!showCourseData && (
          <Form formValue={filter} onChange={setFilter}>
            <Div display="flex" justifyContent="space-between">
              <CRSelectInput
                label="Course"
                data={coursesDefinitions}
                name="courseId"
                placement="auto"
                style={{ width: '300px', marginRight: '30px' }}
              />
              <CRSelectInput
                label="Course Status"
                data={courseStatus}
                name="status"
                placement="auto"
                style={{ width: '300px' }}
              />
              <Div ml={60}>
                <CRSelectInput
                  label="Patient"
                  onSearch={v => setPatientSearchValue(v)}
                  placeholder="Name / Phone no"
                  data={searchedPatients}
                  onChange={val => setFilter({ ...filter, patientId: val })}
                  value={filter.patientId}
                  virtualized={false}
                  style={{ width: '300px' }}
                />
              </Div>
            </Div>
          </Form>
        )}

        <CRButton
          mt={42}
          onClick={() => {
            setShowCourseData(false);
            setFilter(initFilter);
          }}
        >
          All Courses
        </CRButton>
      </Div>
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
        />
      )}
    </>
  );
};

export default Courses;
