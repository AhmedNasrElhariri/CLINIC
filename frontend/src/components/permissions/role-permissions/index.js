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
import useFetchAppointments from '../../../hooks/fetch-appointments';
import usePermissions from 'hooks/use-permissions';

const data = {
  '5ac3e9e0-cbbc-49ae-a6ae-e4fc499b5201': {
    __typename: 'Action',
    id: '5ac3e9e0-cbbc-49ae-a6ae-e4fc499b5201',
    name: 'List',
    subject: 'Appointment',
    visibility: true,
    level: 'Organization',
    rules: [],
  },
  'b0a173c7-141d-4177-8a1a-509d4536a0f3': {
    __typename: 'Action',
    id: 'b0a173c7-141d-4177-8a1a-509d4536a0f3',
    name: 'Create',
    subject: 'Appointment',
    visibility: true,
    level: 'Branch',
    rules: [
      {
        branchId: 1,
      },
    ],
  },
  '4a8e98f5-dc6d-4c43-8f25-7317f0cce11a': {
    __typename: 'Action',
    id: '4a8e98f5-dc6d-4c43-8f25-7317f0cce11a',
    name: 'Reschedule',
    subject: 'Appointment',
    visibility: true,
    level: 'Specialty',
    rules: [
      {
        branchId: 1,
        specialtyId: 1,
      },
    ],
  },
  '9a2c8e0b-eb3e-41cd-a07b-1aa6f0de6f9f': {
    __typename: 'Action',
    id: '9a2c8e0b-eb3e-41cd-a07b-1aa6f0de6f9f',
    name: 'Finish',
    subject: 'Appointment',
    visibility: true,
    level: 'User',
    rules: [
      {
        branchId: 1,
        userId: 1,
      },
    ],
  },
  'a5594daa-832c-4da5-af68-210579858966': {
    __typename: 'Action',
    id: 'a5594daa-832c-4da5-af68-210579858966',
    name: 'Cancel',
    subject: 'Appointment',
    visibility: false,
    level: null,
    rules: [],
  },
  '6588eaf4-bc00-42a1-b60e-b226b59a093e': {
    __typename: 'Action',
    id: '6588eaf4-bc00-42a1-b60e-b226b59a093e',
    name: 'Archive',
    subject: 'Appointment',
    visibility: false,
    level: null,
    rules: [],
  },
  'fa9cabfb-625b-434b-bf1a-2a076d6efc4a': {
    __typename: 'Action',
    id: 'fa9cabfb-625b-434b-bf1a-2a076d6efc4a',
    name: 'View',
    subject: 'Patient',
    visibility: false,
    level: null,
    rules: [],
  },
  'a692d8e6-72bc-4341-9bf4-d4b7cffbbe4b': {
    __typename: 'Action',
    id: 'a692d8e6-72bc-4341-9bf4-d4b7cffbbe4b',
    name: 'View',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  '5a644b8d-eeea-46ad-957d-c143f8731a98': {
    __typename: 'Action',
    id: '5a644b8d-eeea-46ad-957d-c143f8731a98',
    name: 'Add Revenue',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  'bbb60d29-d29f-4f3b-a291-0af979f42848': {
    __typename: 'Action',
    id: 'bbb60d29-d29f-4f3b-a291-0af979f42848',
    name: 'Add Expense',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  'bfb95762-3c28-40e3-9f5c-9fa23627ad09': {
    __typename: 'Action',
    id: 'bfb95762-3c28-40e3-9f5c-9fa23627ad09',
    name: 'Edit Revenue',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  'e395fba8-c666-4282-b870-cf2aa2d36148': {
    __typename: 'Action',
    id: 'e395fba8-c666-4282-b870-cf2aa2d36148',
    name: 'Edit Expense',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  '5b8e3303-a198-40cf-b87d-e61079873da4': {
    __typename: 'Action',
    id: '5b8e3303-a198-40cf-b87d-e61079873da4',
    name: 'Print',
    subject: 'Accounting',
    visibility: false,
    level: null,
    rules: [],
  },
  'fb90df08-3b7a-4356-a983-eb152536f294': {
    __typename: 'Action',
    id: 'fb90df08-3b7a-4356-a983-eb152536f294',
    name: 'View',
    subject: 'Calendar',
    visibility: false,
    level: null,
    rules: [],
  },
  'cf38ce84-a61f-4e69-b64b-c5b6bbee5ecb': {
    __typename: 'Action',
    id: 'cf38ce84-a61f-4e69-b64b-c5b6bbee5ecb',
    name: 'Create Event',
    subject: 'Calendar',
    visibility: false,
    level: null,
    rules: [],
  },
  '549fc751-5006-4829-8676-4153efeba80c': {
    __typename: 'Action',
    id: '549fc751-5006-4829-8676-4153efeba80c',
    name: 'View',
    subject: 'Inventory',
    visibility: false,
    level: null,
    rules: [],
  },
  '706b38cf-95ac-451c-ba05-80f34a2fdc4b': {
    __typename: 'Action',
    id: '706b38cf-95ac-451c-ba05-80f34a2fdc4b',
    name: 'Add Item',
    subject: 'Inventory',
    visibility: false,
    level: null,
    rules: [],
  },
  'cbe0a364-8f4c-47c5-b0f4-145f60a492c1': {
    __typename: 'Action',
    id: 'cbe0a364-8f4c-47c5-b0f4-145f60a492c1',
    name: 'View History',
    subject: 'Inventory',
    visibility: false,
    level: null,
    rules: [],
  },
  'd84c1d68-e757-4ebe-9655-23fc97355044': {
    __typename: 'Action',
    id: 'd84c1d68-e757-4ebe-9655-23fc97355044',
    name: 'Define Item',
    subject: 'Inventory',
    visibility: false,
    level: null,
    rules: [],
  },
};

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
    setRoleForm({ name: 'test role' });
  }, []);

  // useEffect(() => {
  //   setTimeout(() => setFF(data), 2000);
  // }, []);

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

  const handleClick = useCallback(() => {
    const permissions = R.values(ff)
      .filter(ff => ff.visibility)
      .map(({ id, rules, level }) => ({ actionId: id, rules, level }));
    const role = {
      name: roleForm.name,
      permissions,
    };
    createRole(role);
  }, [createRole, ff, roleForm.name]);

  return (
    <>
      <MainContainer
        title="Role Permissions"
        more={
          <CRButton small primary onClick={handleClick}>
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
