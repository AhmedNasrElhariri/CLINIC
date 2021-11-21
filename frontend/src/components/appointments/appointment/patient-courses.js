import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Div, H3, CRButton } from 'components';
import useFrom from 'hooks/form';
import { Can } from 'components/user/can';
import NewCourse from 'components/appointments/appointment/courses';
import CourseData from 'components/appointments/appointment/courses/course';
import { useCourses } from 'hooks';
import { useModal } from 'hooks';

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

const CourseButton = styled.button`
  border: 1px solid rgba(81, 198, 243, 0.15);
  width: 100px;
  background: transparent;
  color: rgba(40, 49, 72, 0.5);
  font-size: 16px;
  cursor: pointer;
  height: 35px;
`;
const Course = ({ patient }) => {
  const { visible, open, close } = useModal();
  const [index, setIndex] = useState(0);
  const [header, setHeader] = useState('');
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
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
    patientId: patient.id,
    courseId: formValue?.id,
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setHeader('Create New Course');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
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
        patientId: patient.id,
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
        },
      });
    }
  }, [
    type,
    formValue,
    patient.id,
    addCourse,
    editCourseDoctor,
    editCourse,
    finishCourse,
  ]);
  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <Div width={800}>
          {courses.map((course, idx) => (
            <CourseButton
              variant="primary"
              onClick={() => setIndex(idx)}
              key={idx}
            >
              {course.courseDefinition.name}
            </CourseButton>
          ))}
        </Div>
        <Div width={200}>
          <Can I="Create" an="Course">
            <CRButton variant="primary" onClick={handleClickCreate}>
              Add New Course+
            </CRButton>
          </Can>
        </Div>
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
      />
      {courses.length > 0 ? (
        <CourseData
          courses={courses}
          indx={index}
          onEditPaid={handleClickEditPaid}
          onEditUnits={handleClickEditUnits}
          onEditDoctor={handleClickEditDoctor}
          onFinishCourse={handleFinishCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      ) : (
        <H3>No courses</H3>
      )}
    </>
  );
};

export default Course;
