import { useMemo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';

import {
  CREATE_ROLE,
  GET_ACTIONS,
  LIST_BRANCHES,
  LIST_SPECIALTIES,
  LIST_USERS,
  CREATE_BRANCH,
  CREATE_SPECIALITY,
  CREATE_USER,
  ADD_SPECIALITY,
  ADD_DOCTOR,
} from 'apollo-client/queries/permission';
import { POSITIONS } from 'utils/constants';

const updateBranchesCache = (client, listBranches) => {
  client.writeQuery({
    query: LIST_BRANCHES,
    data: {
      listBranches,
    },
  });
};

const updateSpecialtiesCache = (client, listSpecialties) => {
  client.writeQuery({
    query: LIST_SPECIALTIES,
    data: {
      listSpecialties,
    },
  });
};

const updateUsersCache = (client, listUsers) => {
  client.writeQuery({
    query: LIST_USERS,
    data: {
      listUsers,
    },
  });
};

function usePermissions({
  onCreateRole,
  onCreateBranch,
  onCreateSpecialty,
  onCreateUser,
  onAddSpecialty,
  onAddDoctor,
} = {}) {
  /* queries */
  const { data: actionsData } = useQuery(GET_ACTIONS);
  const actions = useMemo(() => R.propOr([], 'getActions')(actionsData), [
    actionsData,
  ]);

  const { data: branchesData } = useQuery(LIST_BRANCHES);
  const branches = useMemo(() => R.propOr([], 'listBranches')(branchesData), [
    branchesData,
  ]);

  const { data: specialtiesData } = useQuery(LIST_SPECIALTIES);
  const specialties = useMemo(
    () => R.propOr([], 'listSpecialties')(specialtiesData),
    [specialtiesData]
  );

  const { data: usersData } = useQuery(LIST_USERS);
  const users = useMemo(() => R.propOr([], 'listUsers')(usersData), [
    usersData,
  ]);
  const doctors = useMemo(
    () => users.filter(u => u.position === POSITIONS.DOCTOR),
    [users]
  );

  /* mutations */
  const [createRole] = useMutation(CREATE_ROLE, {
    onCompleted() {
      Alert.success('the role has been created Successfully');
      onCreateRole && onCreateRole();
    },
    onError() {
      Alert.error('Failed to create new role');
    },
  });

  const [createBranch] = useMutation(CREATE_BRANCH, {
    onCompleted() {
      Alert.success('the branch has been created Successfully');
      onCreateBranch && onCreateBranch();
    },
    update(cache, { data: { createBranch: branch } }) {
      updateBranchesCache(cache, [...branches, branch]);
    },
    onError() {
      Alert.error('Failed to create the branch');
    },
  });

  const [createSpecialty] = useMutation(CREATE_SPECIALITY, {
    onCompleted() {
      Alert.success('the specialty has been created Successfully');
      onCreateSpecialty && onCreateSpecialty();
    },
    update(cache, { data: { createSpecialty: specialty } }) {
      updateSpecialtiesCache(cache, [...specialties, specialty]);
    },
    onError() {
      Alert.error('Failed to create new specialty');
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted() {
      Alert.success('the user has been created Successfully');
      onCreateUser && onCreateUser();
    },
    update(cache, { data: { createUser: user } }) {
      updateUsersCache(cache, [...users, user]);
    },
    onError() {
      Alert.error('Failed to create new user');
    },
  });

  const [addSpecialty] = useMutation(ADD_SPECIALITY, {
    onCompleted() {
      Alert.success('the specialty has been added Successfully');
      onAddSpecialty && onAddSpecialty();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_BRANCHES }, { query: LIST_SPECIALTIES }],
  });

  const [addDoctor] = useMutation(ADD_DOCTOR, {
    onCompleted() {
      Alert.success('the doctory has been added Successfully');
      onAddDoctor && onAddDoctor();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_SPECIALTIES }],
  });

  /* compound */
  const groupedPermissions = useMemo(
    () => R.groupBy(R.prop('subject'))(actions),
    [actions]
  );
  const formPermissions = useMemo(
    () =>
      actions.map(p => ({
        ...p,
        visibility: false,
        level: null,
        rules: [],
      })),
    [actions]
  );
  const indexePermissions = useMemo(
    () => R.indexBy(R.prop('id'))(formPermissions),
    [formPermissions]
  );

  return useMemo(
    () => ({
      actions,
      branches,
      specialties,
      users,
      doctors,
      createRole: role => createRole({ variables: { role } }),
      createBranch: branch => createBranch({ variables: { branch } }),
      createSpecialty: specialty =>
        createSpecialty({ variables: { specialty } }),
      createUser: user => createUser({ variables: { user } }),
      addSpecialty: data => addSpecialty({ variables: data }),
      addDoctor: data => addDoctor({ variables: data }),
      indexePermissions,
      groupedPermissions,
    }),
    [
      actions,
      branches,
      specialties,
      users,
      doctors,
      indexePermissions,
      groupedPermissions,
      createRole,
      createBranch,
      createSpecialty,
      createUser,
      addSpecialty,
      addDoctor,
    ]
  );
}

export default usePermissions;
