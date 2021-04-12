import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewCourse from 'components/appointments/appointment/courses';
import CourseData from 'components/appointments/appointment/courses/course';
import { useCourses } from 'hooks';
import { useModal, useNewAppointment } from 'hooks';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENT } from 'apollo-client/queries';
const initValue = {
  courseId: null,
  discount: '',
  price: '',
  paid: 0,
  doctorId: null,
  sessions: [],
  startDate: '',
  date: [],
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
const Course = ({ patient, appointmentId }) => {
  const { visible, open, close } = useModal();
  const [course, setCourse] = useState({});
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });

  const { data } = useQuery(GET_APPOINTMENT, {
    variables: {
      id: appointmentId,
    },
  });
  const appointment = R.propOr({}, 'appointment')(data);
  const patientId = patient.id;
  const userId = appointment.userId;
  const finalFormValue = {
    price: formValue.price - formValue.discount,
    patientId: patient.id,
    courseDefinitionId: formValue.courseId,
    paid: formValue.paid,
    discount: formValue.discount,
    appointmentId: appointmentId,
  };
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
  const { createAppointment } = useNewAppointment({});
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
      addCourse({
        variables: {
          course: finalFormValue,
        },
      });
      formValue.sessions.map(session => {
        createAppointment({
          patientId: patientId,
          type: 'Session',
          date: new Date(session.date),
          userId: userId,
          courseId: courses[courses.length - 1].id,
        });
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
  }, [
    addCourse,
    editCourseDoctor,
    editCourse,
    createAppointment,
    finalFormValue,
    type,
  ]);
  return (
    <>
      <Div textAlign="right">
        {courses.map(course => (
          <CourseButton variant="primary" onClick={() => setCourse(course)}>
            {course.courseDefinition.name}
          </CourseButton>
        ))}
        <CRButton
          variant="primary"
          onClick={handleClickCreate}
          style={{ marginTop: 4, marginLeft: 4 }}
        >
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
      {Object.keys(course).length == 0 ? (
        <></>
      ) : (
        <CourseData
          course={course}
          onEditPaid={handleClickEditPaid}
          onEditDoctor={handleClickEditDoctor}
        />
      )}
    </>
  );
};

export default Course;
