import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  ADD_COURSE_TYPE_DEFINITION,
  EDIT_COURSE_TYPE_DEFINITION,
  LIST_COURSE_TYPES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myCourseTypesDefinition => {
  client.writeQuery({
    query: LIST_COURSE_TYPES_DEFINITION,
    data: {
      myCourseTypesDefinition,
    },
  });
};

function useCourseTypeDefinition({
  onCreate,
  onEdit,
} = {}) {
  const { data } = useQuery(LIST_COURSE_TYPES_DEFINITION);
  const courseTypesDefinition = useMemo(
    () => R.propOr([], 'myCourseTypesDefinition')(data),
    [data]
  );
  

  const [addCourseTypeDefinition, { loading }] = useMutation(
    ADD_COURSE_TYPE_DEFINITION,
    {
      onCompleted() {
        Alert.success('the CourseType has been Added Successfully');
        onCreate && onCreate();
      },
      update(cache, { data: { addCourseTypeDefinition: courseTypeDefinition } }) {
        updateCache([...courseTypesDefinition, courseTypeDefinition]);
      },
      onError() {
        Alert.error('Failed to add new CourseType');
      },
    }
  );
  const [editCourseTypeDefinition] = useMutation(EDIT_COURSE_TYPE_DEFINITION, {
    onCompleted() {
      Alert.success('the CourseType has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the CourseType');
    },
  });

  return useMemo(
    () => ({
      courseTypesDefinition,
      addCourseTypeDefinition,
      editCourseTypeDefinition,
      updateCache,
      loading,
    }),
    [
      courseTypesDefinition,
      addCourseTypeDefinition,
      editCourseTypeDefinition,
      loading,
    ]
  );
}

export default useCourseTypeDefinition;
