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
};
const initValue = {
  course: null,
  discount: 0,
  paid: 0,
  consumed: 0,
  refund: 0,
  doctorId: null,
  sessions: [],
  startDate: null,
  branchId: null,
  specialtyId: null,
  userId: null,
};
const Courses = () => {
  const { visible, open, close } = useModal();
  const [filter, setFilter] = useState(initFilter);
  const [course, setCourse] = useState({});
  const [header, setHeader] = useState('');
  const [bank, setBank] = useState(null);
  const [visa, setVisa] = useState(false);
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
    editCourse,
    editCourseDoctor,
    editCourseUnits,
    deleteCourse,
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
    },
    onEditDoctor: () => {
      close();
      setFormValue(initValue);
    },
    onFinishCourse: () => {
      close();
      setFormValue(initValue);
    },
    onDeleteCourse: () => {
      close();
      setFormValue(initValue);
    },
    patientId: filter.patientId,
    courseId: formValue?.id,
  });

  const handleClickEditUnits = useCallback(
    data => {
      const course = R.pick(['id', 'consumed'])(data);
      setType('consumed');
      setHeader('Add New Units');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditPaid = useCallback(
    data => {
      const course = R.pick(['id', 'paid'])(data);
      setType('edit');
      setHeader('Add New Payment');
      setFormValue(course);
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
    } else if (type === 'consumed') {
      editCourseUnits({
        variables: {
          courseId: formValue.id,
          consumed: formValue.consumed,
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
  ]);

  const filteredCourses = useMemo(() => {
    if (filter.courseId == null) {
      return courses;
    } else {
      return courses.filter(c => c?.courseDefinition?.id == filter?.courseId);
    }
  }, [courses, filter.courseId]);
  return (
    <>
      <Div mb={50} display="flex" justifyContent="space-around">
        <Form formValue={filter} onChange={setFilter}>
          <Div display="flex" justifyContent="space-between">
            <CRSelectInput
              label="Course"
              data={coursesDefinitions}
              name="courseId"
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
                //   searchBy={searchBy}
                virtualized={false}
                style={{ width: '300px' }}
              />
            </Div>
          </Div>
        </Form>
        <CRButton mt={42} onClick={() => setShowCourseData(false)}>
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
          courses={filteredCourses}
          setCourse={setCourse}
          setShowCourseData={setShowCourseData}
        />
      ) : (
        <CourseData
          course={course}
          onEditPaid={handleClickEditPaid}
          onEditUnits={handleClickEditUnits}
          onEditDoctor={handleClickEditDoctor}
          onFinishCourse={handleFinishCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )}
    </>
  );
};

export default Courses;
