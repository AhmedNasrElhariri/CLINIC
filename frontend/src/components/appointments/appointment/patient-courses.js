import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Div, H3, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewCourse from 'components/appointments/appointment/courses';
import CourseData from 'components/appointments/appointment/courses/course';
import { useCourses } from 'hooks';
import { useModal } from 'hooks';

const initValue = {
  course: null,
  discount: 0,
  paid: 0,
  doctorId: null,
  sessions: [],
  startDate: null,
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
  const [course, setCourse] = useState({});
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });

  const {
    addCourse,
    courses,
    editCourse,
    editCourseDoctor,
    users,
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
    patientId: patient.id,
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEditPaid = useCallback(
    data => {
      const course = R.pick(['id', 'paid'])(data);
      setType('edit');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickEditDoctor = useCallback(
    data => {
      const course = R.pick(['id', 'doctorId'])(data);
      setType('courseDoctor');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      const { discount, course, sessions, paid, doctorId } = formValue;
      const finalFormValue = {
        price: course.price - discount,
        patientId: patient.id,
        courseDefinitionId: course.id,
        doctorId,
        sessions,
        paid,
        discount,
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
    } else {
      editCourse({
        variables: {
          courseId: formValue.id,
          paid: formValue.paid,
        },
      });
    }
  }, [type, formValue, patient.id, addCourse, editCourseDoctor, editCourse]);

  return (
    <>
      <Div display="flex" justifyContent="flex-end" alignItems="center">
        {courses.map((course, idx) => (
          <CourseButton
            variant="primary"
            onClick={() => setCourse(course)}
            key={idx}
          >
            {course.courseDefinition.name}
          </CourseButton>
        ))}
        <CRButton variant="primary" onClick={handleClickCreate} ml={2}>
          Add New Course+
        </CRButton>
      </Div>
      <NewCourse
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        users={users}
      />
      {Object.keys(course).length > 0 ? (
        <CourseData
          course={course}
          onEditPaid={handleClickEditPaid}
          onEditDoctor={handleClickEditDoctor}
        />
      ) : (
        <H3>No courses</H3>
      )}
    </>
  );
};

export default Course;
