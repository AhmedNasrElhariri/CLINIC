import { useMemo } from 'react';
import * as R from 'ramda';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';

import {
  CREATE_OR_UPDATE_ROLE,
  LIST_BRANCHES,
  LIST_SPECIALTIES,
  LIST_USERS,
  LIST_ROLES,
  CREATE_BRANCH,
  CREATE_SPECIALITY,
  CREATE_USER,
  ADD_SPECIALITY,
  ADD_DOCTOR,
  ASSIGN_ROLE_TO_DOCOTR,
  LIST_ACTION_USERS,
  LIST_ACTION_DOCTORS,
  DELETE_ROLE_TO_USER,
  EDIT_USER,
} from 'apollo-client/queries';
import { POSITIONS, ACTIONS } from 'utils/constants';

import { convertActionsToEntities } from 'utils/misc';

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

const actions = convertActionsToEntities(Object.keys(ACTIONS));

function usePermissions({
  onCreateOrUpdateRole,
  onCreateBranch,
  onCreateSpecialty,
  onCreateUser,
  onEditUser,
  onAddSpecialty,
  onAddDoctor,
  onAssignRoleToUser,
  onDeleteRoleToUser,
} = {}) {
  const { data: branchesData } = useQuery(LIST_BRANCHES);
  const branches = useMemo(
    () => R.propOr([], 'listBranches')(branchesData),
    [branchesData]
  );

  const { data: specialtiesData } = useQuery(LIST_SPECIALTIES);
  const specialties = useMemo(
    () => R.propOr([], 'listSpecialties')(specialtiesData),
    [specialtiesData]
  );

  const { data: usersData } = useQuery(LIST_USERS);
  const users = useMemo(
    () => R.propOr([], 'listUsers')(usersData),
    [usersData]
  );
  const doctors = useMemo(
    () => users.filter(u => u.position === POSITIONS.DOCTOR),
    [users]
  );
  const { data: rolesData } = useQuery(LIST_ROLES);
  const roles = useMemo(
    () => R.propOr([], 'listRoles')(rolesData),
    [rolesData]
  );

  /* mutations */
  const [createOrUpdateRole] = useMutation(CREATE_OR_UPDATE_ROLE, {
    onCompleted() {
      Alert.success('The role has been created or updated Successfully');
      onCreateOrUpdateRole && onCreateOrUpdateRole();
    },
    onError() {
      Alert.error('Failed to create create or edit role');
    },
    refetchQueries: [{ query: LIST_ROLES }],
  });

  const [createBranch] = useMutation(CREATE_BRANCH, {
    onCompleted() {
      Alert.success('The branch has been created Successfully');
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
      Alert.success('The specialty has been created Successfully');
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
      Alert.success('The user has been created Successfully');
      onCreateUser && onCreateUser();
    },
    update(cache, { data: { createUser: user } }) {
      updateUsersCache(cache, [...users, user]);
    },
    onError() {
      Alert.error('Failed to create new user');
    },
  });

  const [editUser] = useMutation(EDIT_USER, {
    onCompleted() {
      Alert.success('The user has been edited Successfully');
      onEditUser && onEditUser();
    },
    update(cache, { data: { editUser: user } }) {
      updateUsersCache(cache, [...users, user]);
    },
    onError() {
      Alert.error('Failed to edit user');
    },
  });

  const [addSpecialty] = useMutation(ADD_SPECIALITY, {
    onCompleted() {
      Alert.success('The specialty has been added Successfully');
      onAddSpecialty && onAddSpecialty();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_BRANCHES }, { query: LIST_SPECIALTIES }],
  });

  const [addDoctor] = useMutation(ADD_DOCTOR, {
    onCompleted() {
      Alert.success('The doctor has been added Successfully');
      onAddDoctor && onAddDoctor();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_SPECIALTIES }],
  });

  const [assignRoleToUser] = useMutation(ASSIGN_ROLE_TO_DOCOTR, {
    onCompleted() {
      Alert.success('Assigning role to user has been completed Successfully');
      onAssignRoleToUser && onAssignRoleToUser();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_ROLES }],
  });

  const [deleteRoleToUser] = useMutation(DELETE_ROLE_TO_USER, {
    onCompleted() {
      Alert.success('Assigning role to user has been Removed Successfully');
      onDeleteRoleToUser && onDeleteRoleToUser();
    },
    onError(err) {
      Alert.error(err.message);
    },
    refetchQueries: [{ query: LIST_ROLES }],
  });

  /* compound */
  const groupedPermissions = useMemo(
    () => R.groupBy(R.prop('subject'))(actions),
    []
  );
  const formPermissions = useMemo(
    () =>
      actions.map(p => ({
        ...p,
        visibility: false,
        level: null,
        rules: [],
      })),
    []
  );
  const indexePermissions = useMemo(
    () => R.indexBy(R.prop('id'))(formPermissions),
    [formPermissions]
  );

  const [listActionUsers, { data: actionUsersResp }] =
    useLazyQuery(LIST_ACTION_USERS);
  const [listActionDoctors, { data: doctorsDataResp }] =
    useLazyQuery(LIST_ACTION_DOCTORS);

  const actionUsers = R.prop('listActionUsers')(actionUsersResp);
  const actionDoctors = R.prop('listActionDoctors')(doctorsDataResp);

  return useMemo(
    () => ({
      actions,
      branches,
      specialties,
      users,
      doctors,
      createOrUpdateRole: role => createOrUpdateRole({ variables: { role } }),
      createBranch: branch => createBranch({ variables: { branch } }),
      createSpecialty: specialty =>
        createSpecialty({ variables: { specialty } }),
      createUser: user => createUser({ variables: { user } }),
      editUser: user => editUser({ variables: { user } }),
      addSpecialty: data => addSpecialty({ variables: data }),
      addDoctor: data => addDoctor({ variables: data }),
      assignRoleToUser: data => assignRoleToUser({ variables: data }),
      deleteRoleToUser: data => deleteRoleToUser({ variables: data }),
      indexePermissions,
      groupedPermissions,
      roles,
      listActionUsers: action => listActionUsers({ variables: { action } }),
      listActionDoctors: action => listActionDoctors({ variables: { action } }),
      actionUsers: actionUsers || [],
      actionDoctors: actionDoctors || [],
    }),
    [
      branches,
      specialties,
      users,
      doctors,
      indexePermissions,
      deleteRoleToUser,
      groupedPermissions,
      roles,
      actionUsers,
      actionDoctors,
      createOrUpdateRole,
      createBranch,
      createSpecialty,
      createUser,
      editUser,
      addSpecialty,
      addDoctor,
      assignRoleToUser,
      listActionUsers,
      listActionDoctors,
    ]
  );
}

export default usePermissions;
