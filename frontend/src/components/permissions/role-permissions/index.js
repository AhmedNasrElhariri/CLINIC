import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';
import { Toggle, Panel, Form } from 'rsuite';

import {
  MainContainer,
  Div,
  H6,
  H5,
  CRButton,
  CRTextInput,
  CRPanelGroup,
} from 'components';

import PermissionRules from '../permission-rules';
import usePermissions from 'hooks/use-permissions';
import { ALL_CHOICE } from 'utils/constants';

import data from './test.json';

const RolePermission = () => {
  const [ff, setFF] = useState({});
  const [roleForm, setRoleForm] = useState({ name: '' });
  const { branches, doctors } = usePermissions();
  const {
    createRole,
    indexePermissions,
    groupedPermissions,
  } = usePermissions();

  useEffect(() => {
    setFF(indexePermissions);
  }, [indexePermissions]);

  useEffect(() => {
    setTimeout(() => setFF(data), 2000);
  }, []);

  const toggle = useCallback(
    id => {
      const action = ff[id];
      const newForm = { ...action, visibility: !action.visibility };
      setFF({ ...ff, [id]: newForm });
    },
    [ff]
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

  // console.log(JSON.stringify(ff));

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
    [ff]
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
    [ff]
  );

  const handleCreateRole = useCallback(() => {
    const permissions = R.values(ff)
      .filter(ff => ff.visibility)
      .map(({ id, rules, level }) =>
        Object.assign(
          { actionId: id, level },
          rules.some(({ branchId }) => branchId === ALL_CHOICE)
            ? { all: true }
            : { rules }
        )
      );
    const role = {
      name: roleForm.name,
      permissions,
    };
    console.log(role);
    createRole(role);
  }, [createRole, ff, roleForm.name]);

  return (
    <>
      <MainContainer
        title="Role Permissions"
        more={
          <CRButton small primary onClick={handleCreateRole}>
            Save
          </CRButton>
        }
      >
        <Div mb={4}>
          <Form formValue={roleForm} onChange={setRoleForm}>
            <CRTextInput name="name" label="Role Name" />
          </Form>
        </Div>

        {Object.keys(ff).length > 1 && (
          <Form formValue={ff} fluid>
            {Object.entries(groupedPermissions).map(
              ([subject, actions], index) => (
                <CRPanelGroup
                  accordion
                  style={{ marginBottom: 30 }}
                  key={index}
                >
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
                            <Div
                              key={id}
                              display="flex"
                              justifyContent="space-between"
                              height={60}
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
                            {f.visibility && (
                              <PermissionRules
                                label="Permission Level"
                                level={f.level}
                                branches={branches}
                                doctors={doctors}
                                rules={f.rules}
                                onChange={level => handleLevelChange(id, level)}
                                onAdd={value => handleAddMapping(id, value)}
                                onDelete={mappingIndex =>
                                  handleDeleteMapping(id, mappingIndex)
                                }
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Div>
                  </Panel>
                </CRPanelGroup>
              )
            )}
          </Form>
        )}
      </MainContainer>
    </>
  );
};
RolePermission.propTypes = {};

export default RolePermission;
