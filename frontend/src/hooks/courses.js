import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_COURSE,
  EDIT_COURSE,
  LIST_COURSES,
  LIST_PATIENT_COURSES,
  LIST_USERS,
  EDIT_COURSE_DOCTOR,
  FINISH_COURSE,
  DELETE_COURSE,
  LIST_APPOINTMENTS,
  LIST_REVENUES,
  EDIT_COURSE_UNITS,
  LIST_COURSE_PAYMENTS,
  EDIT_COURSE_PAYMENT_HISTORY,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = (myCourses, patientId) => {
  client.writeQuery({
    query: LIST_COURSES,
    variables: {
      patientId: patientId,
      LIST_REVENUES,
    },
  });
};

function useCourses({
  onCreate,
  onEdit,
  onEditDoctor,
  patientId,
  courseId,
  onFinishCourse,
  onDeleteCourse,
  onEditCoursePaymentHistory,
} = {}) {
  const { data } = useQuery(LIST_COURSES, { variables: { patientId } });
  const courses = useMemo(() => R.propOr([], 'myCourses')(data), [data]);
  const { data: patientData } = useQuery(LIST_PATIENT_COURSES, {
    variables: { patientId },
  });
  const patientCourses = useMemo(
    () => R.propOr([], 'myCourses')(patientData),
    [patientData]
  );
  const { data: userData } = useQuery(LIST_USERS);
  const users = useMemo(() => R.propOr([], 'listUsers')(userData), [userData]);

  const { data: dataPayment } = useQuery(LIST_COURSE_PAYMENTS, {
    variables: { courseId },
  });
  const coursePayments = useMemo(
    () => R.propOr([], 'coursePayments')(dataPayment),
    [dataPayment]
  );

  const [addCourse, { loading }] = useMutation(ADD_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Added Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_APPOINTMENTS,
      },
      {
        query: LIST_REVENUES,
      },
    ],
    onError() {
      Alert.error('Failed to add new Course');
    },
  });
  const [editCourse] = useMutation(EDIT_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSE_PAYMENTS,
        variables: { courseId: courseId },
      },
      {
        query: LIST_REVENUES,
      },
    ],
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });
  const [editCoursePaymentHistory] = useMutation(EDIT_COURSE_PAYMENT_HISTORY, {
    onCompleted() {
      Alert.success('The Payment History has been Edited Successfully');
      onEditCoursePaymentHistory && onEditCoursePaymentHistory();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSE_PAYMENTS,
        variables: { courseId: courseId },
      },
      {
        query: LIST_REVENUES,
      },
    ],
    onError() {
      Alert.error('Failed to edit the Payment History ');
    },
  });
  const [editCourseUnits] = useMutation(EDIT_COURSE_UNITS, {
    onCompleted() {
      Alert.success('the Course has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });
  const [editCourseDoctor] = useMutation(EDIT_COURSE_DOCTOR, {
    onCompleted() {
      Alert.success('the Doctor has been Edited Successfully');
      onEditDoctor && onEditDoctor();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });

  const [finishCourse] = useMutation(FINISH_COURSE, {
    onCompleted() {
      Alert.success('the Course Finished  Successfully');
      onFinishCourse && onFinishCourse();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to Finish the Course');
    },
  });
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    onCompleted() {
      Alert.success('the Course has been deleted Successfully');
      onDeleteCourse && onDeleteCourse();
    },
    refetchQueries: [
      {
        query: LIST_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to delete this Course');
    },
  });
  return useMemo(
    () => ({
      courses,
      patientCourses,
      addCourse,
      editCourse,
      editCourseDoctor,
      deleteCourse,
      users,
      loading,
      editCourseUnits,
      finishCourse,
      updateCache,
      coursePayments,
      editCoursePaymentHistory,
    }),
    [
      courses,
      patientCourses,
      addCourse,
      editCourse,
      deleteCourse,
      loading,
      editCourseUnits,
      editCourseDoctor,
      finishCourse,
      users,
      coursePayments,
      editCoursePaymentHistory,
    ]
  );
}

export default useCourses;
