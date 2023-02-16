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
  TOTAL_UNPAID_OF_COURSES,
  LIST_COURSE_UNITS_HISTORY,
  EDIT_COURSE_UNIT_HISTORY,
  LIST_COURSE_PARTS,
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
  page,
  courseID,
  status,
  sortType,
} = {}) {
  const { data } = useQuery(LIST_COURSES, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      patientId && { patientId },
      status && { status },
      courseID && { courseId: courseID },
      sortType && { sortType: sortType }
    ),
  });

  const coursesData = useMemo(() => R.propOr({}, 'myCourses')(data), [data]);
  const courses = useMemo(
    () => R.propOr([], 'courses')(coursesData),
    [coursesData]
  );
  const coursesCount = useMemo(
    () => R.propOr(0, 'coursesCount')(coursesData),
    [coursesData]
  );
  const { data: patientData } = useQuery(LIST_PATIENT_COURSES, {
    variables: { patientId },
  });
  const patientCourses = useMemo(
    () => R.propOr([], 'myPatientCourses')(patientData),
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
  const [addCourse, { loading }] = useMutation(ADD_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Added Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
        query: LIST_PATIENT_COURSES,
        variables: { patientId: patientId },
      },
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
      },
      {
        query: LIST_COURSE_PAYMENTS,
        variables: { courseId: courseId },
      },
      {
        query: LIST_REVENUES,
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
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
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
      {
        query: LIST_COURSES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          patientId && { patientId },
          status && { status },
          courseID && { courseId: courseID },
          sortType && { sortType: sortType }
        ),
      },
    ],
    onError() {
      Alert.error('Failed to edit the Transaction');
    },
  });

  //paid course and  add units with doctor fees

  return useMemo(
    () => ({
      courses,
      coursesCount,
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
      totalUnpaidOfCourses,
      courseUnitsHistory,
      editCourseUnitHistory,
      courseParts,
    }),
    [
      courses,
      coursesCount,
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
      totalUnpaidOfCourses,
      courseUnitsHistory,
      editCourseUnitHistory,
      courseParts,
    ]
  );
}

export default useCourses;
