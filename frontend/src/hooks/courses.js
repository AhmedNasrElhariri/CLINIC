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
  LIST_REVENUES,
  LIST_APPOINTMENTS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = (myCourses, patientId) => {
  client.writeQuery({
    query: LIST_COURSES,
    variables: {
      patientId: patientId,
    },
    data: {
      myCourses,
    },
  });
};

function useCourses({
  onCreate,
  onEdit,
  onEditDoctor,
  patientId,
  onFinishCourse,
} = {}) {
  const { data } = useQuery(LIST_COURSES, { variables: { patientId } });
  const courses = useMemo(() => R.propOr([], 'myCourses')(data), [data]);
  const { data: patientData } = useQuery(LIST_PATIENT_COURSES, {
    variables: { patientId },
  });
  const patientCourses = useMemo(() => R.propOr([], 'myCourses')(patientData), [
    patientData,
  ]);
  const { data: userData } = useQuery(LIST_USERS);
  const users = useMemo(() => R.propOr([], 'listUsers')(userData), [userData]);

  const [addCourse] = useMutation(ADD_COURSE, {
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
        query: LIST_REVENUES,
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

  return useMemo(
    () => ({
      courses,
      patientCourses,
      addCourse,
      editCourse,
      editCourseDoctor,
      users,
      finishCourse,
      updateCache,
    }),
    [
      courses,
      patientCourses,
      addCourse,
      editCourse,
      editCourseDoctor,
      finishCourse,
      users,
    ]
  );
}

export default useCourses;
