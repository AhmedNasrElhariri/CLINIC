import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_COURSE,
  EDIT_COURSE,
  LIST_PATIENT_COURSES,
  EDIT_COURSE_DOCTOR,
  FINISH_COURSE,
  DELETE_COURSE,
  EDIT_COURSE_UNITS,
  LIST_COURSE_PAYMENTS,
  EDIT_COURSE_PAYMENT_HISTORY,
  TOTAL_UNPAID_OF_COURSES,
  LIST_COURSE_UNITS_HISTORY,
  EDIT_COURSE_UNIT_HISTORY,
  LIST_COURSE_PARTS,
} from 'apollo-client/queries';

function usePatientCourses({
  onCreate,
  onEdit,
  onEditDoctor,
  patientId,
  courseId,
  onFinishCourse,
  onDeleteCourse,
} = {}) {
  const { data: patientData } = useQuery(LIST_PATIENT_COURSES, {
    variables: { patientId },
  });
  const patientCourses = useMemo(
    () => R.propOr([], 'myPatientCourses')(patientData),
    [patientData]
  );

  const { data: dataPayment } = useQuery(LIST_COURSE_PAYMENTS, {
    variables: { courseId },
    fetchPolicy:'cache-and-network'
  });
  const coursePayments = useMemo(
    () => R.propOr([], 'coursePayments')(dataPayment),
    [dataPayment]
  );

  const { data: courseUnitsHistoryData } = useQuery(LIST_COURSE_UNITS_HISTORY, {
    variables: { courseId },
  });
  const courseUnitsHistory = useMemo(
    () => R.propOr([], 'courseUnitsHistory')(courseUnitsHistoryData),
    [courseUnitsHistoryData]
  );

  const { data: totalUnpaidOfCoursesData } = useQuery(TOTAL_UNPAID_OF_COURSES);
  const totalUnpaidOfCourses = useMemo(
    () => R.propOr({}, 'totalUnpaidOfCourses')(totalUnpaidOfCoursesData),
    [totalUnpaidOfCoursesData]
  );

  const { data: coursePartsData, refetch: refetchCourseParts } = useQuery(
    LIST_COURSE_PARTS,
    {
      variables: { courseId },
    }
  );
  const courseParts = useMemo(
    () => R.propOr([], 'courseParts')(coursePartsData),
    [coursePartsData]
  );
  const [addCourse] = useMutation(ADD_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Added Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
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
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSE_PAYMENTS,
        variables: { courseId: courseId },
      },
    ],
    onError: ({ message }) => Alert.error(message),
  });
  const [editCoursePaymentHistory] = useMutation(EDIT_COURSE_PAYMENT_HISTORY, {
    onCompleted() {
      Alert.success('The Payment History has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSE_PAYMENTS,
        variables: { courseId: courseId },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Payment History ');
    },
  });
  const [editCourseUnits] = useMutation(EDIT_COURSE_UNITS, {
    onCompleted() {
      Alert.success('the Course has been Edited Successfully');
      refetchCourseParts();
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSE_UNITS_HISTORY,
        variables: { courseId: courseId },
      },
    ],
    onError: ({ message }) => Alert.error(message),
  });
  const [editCourseDoctor] = useMutation(EDIT_COURSE_DOCTOR, {
    onCompleted() {
      Alert.success('the Doctor has been Edited Successfully');
      onEditDoctor && onEditDoctor();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
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
        query: LIST_PATIENT_COURSES,
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
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to delete this Course');
    },
  });
  const [editCourseUnitHistory] = useMutation(EDIT_COURSE_UNIT_HISTORY, {
    onCompleted() {
      Alert.success('the Transaction has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
    ],
    onError() {
      Alert.error('Failed to edit the Transaction');
    },
  });

  //paid course and  add units with doctor fees

  return useMemo(
    () => ({
      addCourse,
      patientCourses,
      editCourse,
      editCourseDoctor,
      deleteCourse,
      editCourseUnits,
      finishCourse,
      coursePayments,
      editCoursePaymentHistory,
      totalUnpaidOfCourses,
      courseUnitsHistory,
      editCourseUnitHistory,
      courseParts,
    }),
    [
      addCourse,
      patientCourses,
      editCourse,
      deleteCourse,
      editCourseUnits,
      editCourseDoctor,
      finishCourse,
      coursePayments,
      editCoursePaymentHistory,
      totalUnpaidOfCourses,
      courseUnitsHistory,
      editCourseUnitHistory,
      courseParts,
    ]
  );
}

export default usePatientCourses;
