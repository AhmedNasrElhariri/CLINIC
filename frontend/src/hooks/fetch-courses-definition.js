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

function useCoursesDefinition({ onCreate, onEdit } = {}) {
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

  return useMemo(
    () => ({
      coursesDefinitions,
      addCourseDefinition,
      editCourseDefinition,
      updateCache,
      loading,
    }),
    [coursesDefinitions, addCourseDefinition, editCourseDefinition, loading]
  );
}

export default useCoursesDefinition;
