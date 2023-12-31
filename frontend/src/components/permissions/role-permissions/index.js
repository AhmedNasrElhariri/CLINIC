import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { Toggle, Panel, Form } from 'rsuite';
import { Div, H6, H5, CRTextInput, CRPanelGroup, CRModal } from 'components';
import PermissionRules from '../permission-rules';
import PermissionRulesRelatedByOrganizationOnly from '../permission-rules/organization-only';
import { usePermissions } from 'hooks';
import { ALL_CHOICE, CRUD } from 'utils/constants';
import { PermissionExist } from 'services/permissions';

const normalizePermisson = (permissions = []) =>
  R.pipe(
    R.map(p => {
      const action = `${p.action}_${p.subject}`;
      if (p.all) {
        if (p.level === 'User') {
          const ru = [{ userId: ALL_CHOICE }];
          return { ...p, visibility: true, id: action, action, rules: ru };
        } else if (p.level === 'Specialty') {
          const ru = [{ specialtyId: ALL_CHOICE }];
          return { ...p, visibility: true, id: action, action, rules: ru };
        } else if (p.level === 'Branch') {
          const ru = [{ branchId: ALL_CHOICE }];
          return { ...p, visibility: true, id: action, action, rules: ru };
        }
      } else {
        return { ...p, visibility: true, id: action, action };
      }
    }),
    R.indexBy(R.prop('action'))
  )(permissions);

const RolePermissions = ({
  show,
  onClose,
  onCreateOrUpdate,
  onEdit,
  defaultFormValue,
}) => {
  const [formValue, setFormValue] = useState({
    name: '',
    permissions: {},
  });
  const setFF = useCallback(permissions => {
    setFormValue(f => ({ ...f, permissions }));
  }, []);

  const {
    branches,
    doctors,
    createOrUpdateRole,
    indexePermissions,
    groupedPermissions,
  } = usePermissions({
    onCreateOrUpdateRole: () => {
      setFF(indexePermissions);
      onCreateOrUpdate && onCreateOrUpdate();
    },
    onEditRole: () => {
      setFF(indexePermissions);
      onEdit && onEdit();
    },
  });
  const ff = useMemo(() => formValue.permissions, [formValue.permissions]);

  useEffect(() => {
    setFormValue(f => ({ ...f, permissions: indexePermissions }));
  }, [indexePermissions]);

  useEffect(() => {
    setFormValue({
      ...defaultFormValue,
      permissions: {
        ...indexePermissions,
        ...normalizePermisson(defaultFormValue?.permissions),
      },
    });
  }, [indexePermissions, defaultFormValue]);

  const toggle = useCallback(
    id => {
      const action = ff[id];
      const newForm = { ...action, visibility: !action.visibility };
      setFF({ ...ff, [id]: newForm });
    },
    [ff, setFF]
  );

  const handleLevelChange = (actionId, level) => {
    const oldAction = ff[actionId];
    const newActions = {
      ...oldAction,
      level,
      rules: [],
    };

    setFF({
      ...ff,
      [actionId]: newActions,
    });
  };

  const handleAddMapping = useCallback(
    (actionId, value) => {
      const oldAction = ff[actionId];
      const rules = [...oldAction.rules, value];
      const newActions = {
        ...oldAction,
        rules,
      };

      setFF({
        ...ff,
        [actionId]: newActions,
      });
    },
    [ff, setFF]
  );

  const handleDeleteMapping = useCallback(
    (actionId, index) => {
      const oldAction = ff[actionId];
      const rules = R.remove(index, 1)(oldAction.rules);
      const newActions = {
        ...oldAction,
        rules,
      };

      setFF({
        ...ff,
        [actionId]: newActions,
      });
    },
    [ff, setFF]
  );

  const handleCreateRole = useCallback(() => {
    const permissions = R.values(ff)
      .filter(ff => ff.visibility)
      .map(({ id, rules, level }) =>
        Object.assign(
          { action: id, level },
          rules.some(({ branchId }) => branchId === ALL_CHOICE)
            ? { all: true }
            : { rules }
        )
      );
    const role = {
      id: defaultFormValue?.id,
      name: formValue.name,
      permissions,
    };
    createOrUpdateRole(role);
  }, [defaultFormValue?.id, ff, formValue.name]);
  return (
    <CRModal
      header="Role Permissions"
      onOk={handleCreateRole}
      onHide={onClose}
      onCancel={onClose}
      width={1200}
      show={show}
      bodyStyle={{ padding: '50px 80px' }}
    >
      <Form formValue={formValue} onChange={setFormValue} fluid>
        <Div mb={2}>
          <CRTextInput name="name" label="Role Name" />
        </Div>
        {Object.keys(ff).length > 1 &&
          Object.entries(groupedPermissions).map(
            ([subject, actions], index) => (
              <CRPanelGroup accordion style={{ marginBottom: 30 }} key={index}>
                <Panel
                  header={
                    <H5 fontWeight={600} px={4} py={3}>
                      {subject}
                    </H5>
                  }
                >
                  <Div pl={50}>
                    {actions.map(({ id, name }) => {
                      const f = ff[id];
                      return (
                        <React.Fragment key={id}>
                          <Div mb={30}>
                            <Div
                              key={id}
                              display="flex"
                              justifyContent="space-between"
                              // height={30}
                              cursor="pointer"
                              onClick={() => toggle(id)}
                            >
                              <H6>{name}</H6>
                              <Toggle
                                size="md"
                                checked={f.visibility}
                                onChange={() => toggle(id)}
                              />
                            </Div>
                            {f.visibility && PermissionExist(id) ? (
                              <PermissionRulesRelatedByOrganizationOnly
                                label="Permission Level"
                                level={f.level}
                                onChange={level => handleLevelChange(id, level)}
                                onAdd={value => handleAddMapping(id, value)}
                                onDelete={mappingIndex =>
                                  handleDeleteMapping(id, mappingIndex)
                                }
                              />
                            ) : (
                              f.visibility && (
                                <PermissionRules
                                  label="Permission Level"
                                  level={f.level}
                                  branches={branches}
                                  doctors={doctors}
                                  rules={f.rules}
                                  all={f.all}
                                  onChange={level =>
                                    handleLevelChange(id, level)
                                  }
                                  onAdd={value => handleAddMapping(id, value)}
                                  onDelete={mappingIndex =>
                                    handleDeleteMapping(id, mappingIndex)
                                  }
                                />
                              )
                            )}
                          </Div>
                        </React.Fragment>
                      );
                    })}
                  </Div>
                </Panel>
              </CRPanelGroup>
            )
          )}
      </Form>
    </CRModal>
  );
};
RolePermissions.propTypes = {};

RolePermissions.defaultProps = {
  type: CRUD.CREATE,
};

export default RolePermissions;
