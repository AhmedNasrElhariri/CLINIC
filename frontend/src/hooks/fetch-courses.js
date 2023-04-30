import { Alert } from 'rsuite';
import { useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  ADD_COURSE,
  EDIT_COURSE,
  LIST_COURSES,
  LIST_PATIENT_COURSES,
  EDIT_COURSE_DOCTOR,
} from 'apollo-client/queries';
import client from 'apollo-client/client';
import * as R from 'ramda';

const updateCache = myCourses => {
  client.writeQuery({
    query: LIST_COURSES,
    data: {
      myCourses,
    },
  });
};

function useCourses({ onCreate, onEdit, onEditDoctor, patientId } = {}) {
  const { data } = useQuery(
    LIST_COURSES,
    { variables: { patientId } },
    { fetchPolicy: 'network-only' }
  );
  const courses = useMemo(() => R.propOr([], 'myCourses')(data), [data]);
  const { data: patientData } = useQuery(
    LIST_PATIENT_COURSES,
    { variables: { patientId } },
    { fetchPolicy: 'network-only' }
  );
  const patientCourses = useMemo(
    () => R.propOr([], 'myCourses')(patientData),
    [patientData]
  );

  const [addCourse] = useMutation(ADD_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addCourse: course } }) {
      updateCache([...courses, course]);
    },
    onError() {
      Alert.error('Failed to add new Course');
    },
  });
  const [editCourse] = useMutation(EDIT_COURSE, {
    onCompleted() {
      Alert.success('the Course has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });
  const [editCourseDoctor] = useMutation(EDIT_COURSE_DOCTOR, {
    onCompleted() {
      Alert.success('the Doctor has been Edited Successfully');
      onEditDoctor && onEditDoctor();
    },
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });

  return useMemo(
    () => ({
      courses,
      patientCourses,
      addCourse,
      editCourse,
      editCourseDoctor,
      updateCache,
    }),
    [courses, patientCourses, addCourse, editCourse, editCourseDoctor]
  );
}

export default useCourses;
