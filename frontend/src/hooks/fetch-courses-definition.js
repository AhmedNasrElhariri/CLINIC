import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_COURSE_DEFINITION,
  EDIT_COURSE_DEFINITION,
  LIST_COURSES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myCoursesDefinition => {
  client.writeQuery({
    query: LIST_COURSES_DEFINITION,
    data: {
      myCoursesDefinition,
    },
  });
};

function useCoursesDefinition({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_COURSES_DEFINITION);
  const coursesDefinitions = useMemo(
    () => R.propOr([], 'myCoursesDefinition')(data),
    [data]
  );

  const [addCourseDefinition, { loading }] = useMutation(
    ADD_COURSE_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Course has been Added Successfully');
        onCreate && onCreate();
      },
      update(cache, { data: { addCourseDefinition: courseDefinition } }) {
        updateCache([...coursesDefinitions, courseDefinition]);
      },
      onError() {
        Alert.error('Failed to add new Course');
      },
    }
  );
  const [editCourseDefinition] = useMutation(EDIT_COURSE_DEFINITION, {
    onCompleted() {
      Alert.success('the Course has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Course');
    },
  });
  const [deleteCourseDefinition] = useMutation(EDIT_COURSE_DEFINITION, {
    onCompleted() {
      Alert.success('the Course has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_COURSES_DEFINITION,
      },
    ],
    onError() {
      Alert.error('Failed to delete the Course');
    },
  });

  return useMemo(
    () => ({
      coursesDefinitions,
      addCourseDefinition,
      editCourseDefinition,
      deleteCourseDefinition,
      updateCache,
      loading,
    }),
    [
      coursesDefinitions,
      addCourseDefinition,
      editCourseDefinition,
      deleteCourseDefinition,
      loading,
    ]
  );
}

export default useCoursesDefinition;
