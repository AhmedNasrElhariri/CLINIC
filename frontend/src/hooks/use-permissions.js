import { useMemo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';

import { CREATE_ROLE, GET_ACTIONS } from 'apollo-client/queries/permission';

function usePermissions({ onCreate, onEdit } = {}) {
  const [createRole] = useMutation(CREATE_ROLE, {
    onCompleted() {
      Alert.success('the role has been create Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { defineSurgery: surgery } }) {},
    onError() {
      Alert.error('Failed to create the role');
    },
  });

  const { data } = useQuery(GET_ACTIONS, {
    variables: {},
  });
  const actions = useMemo(() => R.propOr([], 'getActions')(data), [data]);

  const groupedPermissions = useMemo(
    () => R.groupBy(R.prop('subject'))(actions),
    [actions]
  );
  const formPermissions = useMemo(() =>
    actions.map(p => ({
      ...p,
      visibility: false,
      level: null,
      rules: [],
    }))
    , [actions]);
    const indexePermissions = useMemo(
      () => R.indexBy(R.prop('id'))(formPermissions),
      [formPermissions]
    );

  return useMemo(
    () => ({
      actions,
      groupedPermissions,
      indexePermissions,
      createRole: role => createRole({ variables: { role } }),
    }),
    [actions, createRole, groupedPermissions, indexePermissions]
  );
}

export default usePermissions;
