import React, { useCallback, useState, useMemo } from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import { Div, H3, CRButton } from 'components';
import useFrom from 'hooks/form';
import { Can } from 'components/user/can';
import NewCourse from 'components/appointments/appointment/courses';
import CourseData from 'components/appointments/appointment/courses/course';
import { useCourses } from 'hooks';
import { useModal } from 'hooks';
import { CRTabs } from 'components';

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
const Course = ({ patientId }) => {
  const { visible, open, close } = useModal();
  const [index, setIndex] = useState(0);
  const [header, setHeader] = useState('');
  const [visa, setVisa] = useState(false);
  const [bank, setBank] = useState(null);
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
    onEditCoursePaymentHistory: () => {
      close();
      setFormValue(initValue);
    },
    patientId: patientId,
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
      setHeader('Cancel The Course');
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
        patientId: patientId,
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
    } else if (type === 'deleteCourse') {
      deleteCourse({
        variables: {
          courseId: formValue.id,
          refund: formValue.refund,
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
    patientId,
    addCourse,
    editCourseDoctor,
    editCourse,
    editCoursePaymentHistory,
    finishCourse,
    bank,
  ]);
  const InprogressCourses = useMemo(
    () => courses.filter(c => c.status === 'InProgress'),
    [courses]
  );
  const FinishedCourses = useMemo(
    () =>
      courses.filter(
        c => c.status === 'Finished' || c.status === 'EarlyFinished'
      ),
    [courses]
  );
  const CancelledCourses = useMemo(
    () =>
      courses.filter(c => c.status === 'Cancelled' || c.status === 'Rejected'),
    [courses]
  );
  console.log(CancelledCourses, 'CancelledCourses');
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>InProgress Courses</CRTabs.CRTab>
          <CRTabs.CRTab>Finished Courses</CRTabs.CRTab>
          <CRTabs.CRTab>Cancelled Courses</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between">
              <Div width={900}>
                <>
                  {InprogressCourses.map((course, idx) => (
                    <CourseButton
                      variant="primary"
                      onClick={() => setIndex(idx)}
                      key={idx}
                    >
                      {course.courseDefinition.name}
                    </CourseButton>
                  ))}
                  <Div width={200}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        Add New Course+
                      </CRButton>
                    </Can>
                  </Div>
                  {InprogressCourses.length > 0 ? (
                    <CourseData
                      courses={InprogressCourses}
                      indx={index}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                    />
                  ) : (
                    <H3>No courses</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between">
              <Div width={900}>
                <>
                  {FinishedCourses.map((course, idx) => (
                    <CourseButton
                      variant="primary"
                      onClick={() => setIndex(idx)}
                      key={idx}
                    >
                      {course.courseDefinition.name}
                    </CourseButton>
                  ))}
                  <Div width={200}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        Add New Course+
                      </CRButton>
                    </Can>
                  </Div>
                  {FinishedCourses.length > 0 ? (
                    <CourseData
                      courses={FinishedCourses}
                      indx={index}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                    />
                  ) : (
                    <H3>No courses</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Div display="flex" justifyContent="space-between">
              <Div width={900}>
                <>
                  {CancelledCourses.map((course, idx) => (
                    <CourseButton
                      variant="primary"
                      onClick={() => setIndex(idx)}
                      key={idx}
                    >
                      {course.courseDefinition.name}
                    </CourseButton>
                  ))}
                  <Div width={200}>
                    <Can I="Create" an="Course">
                      <CRButton variant="primary" onClick={handleClickCreate}>
                        Add New Course+
                      </CRButton>
                    </Can>
                  </Div>
                  {CancelledCourses.length > 0 ? (
                    <CourseData
                      courses={CancelledCourses}
                      indx={index}
                      onEditPaid={handleClickEditPaid}
                      onEditUnits={handleClickEditUnits}
                      onAddUnits={handleClickAddUnits}
                      onEditDoctor={handleClickEditDoctor}
                      onFinishCourse={handleFinishCourse}
                      onDeleteCourse={handleDeleteCourse}
                      onEditHistoryPayment={handleClickEditHistoryPayment}
                    />
                  ) : (
                    <H3>No courses</H3>
                  )}
                </>
              </Div>
            </Div>
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
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
    </>
  );
};

export default Course;
