import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { Toggle, Panel, Form } from 'rsuite';

import { MainContainer, Div, H6, H5, CRButton, CRPanelGroup } from 'components';
import RoleInput from './create-role';

import { RAW_PERMISSIONS } from 'utils/constants';
import RadioInputsGroup from 'components/widgets/input/radio-input';
import useFetchAppointments from '../../../hooks/fetch-appointments';

const formPermissions = RAW_PERMISSIONS.map(p => ({
  ...p,
  visibility: false,
  level: null,
  mappings: [],
}));

const groupedPermissions = R.groupBy(R.prop('subject'))(RAW_PERMISSIONS);
const indexePermissions = R.indexBy(R.prop('id'))(formPermissions);

const RolePermission = () => {
  const [ff, setFF] = useState(indexePermissions);
  const { branches } = useFetchAppointments();

  const toggle = id => {
    const action = ff[id];
    const newForm = { ...action, visibility: !action.visibility };
    setFF({ ...ff, [id]: newForm });
  };

  const handleLevelChange = (actionId, level) => {
    const oldAction = ff[actionId];
    const newActions = {
      ...oldAction,
      level,
    };

    setFF({
      ...ff,
      [actionId]: newActions,
    });
  };

  const handleAddMapping = useCallback(
    (actionId, value) => {
      const oldAction = ff[actionId];
      const mappings = [...oldAction.mappings, value];
      const newActions = {
        ...oldAction,
        mappings,
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
      const mappings = R.remove(index, 1)(oldAction.mappings);
      const newActions = {
        ...oldAction,
        mappings,
      };

      setFF({
        ...ff,
        [actionId]: newActions,
      });
    },
    [ff]
  );

  return (
    <>
      <MainContainer
        title={`Role Permissions`}
        more={
          <CRButton small primary>
            Save
          </CRButton>
        }
      >
        <Div mb={4}>
          <RoleInput />
        </Div>

        <Form formValue={ff} fluid>
          {Object.entries(groupedPermissions).map(
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
                          <Div
                            key={id}
                            display="flex"
                            justifyContent="space-between"
                            height={70}
                          >
                            <H6>{name}</H6>
                            <Toggle
                              size="md"
                              checked={f.visibility}
                              onChange={() => toggle(id)}
                            />
                          </Div>
                          {f.visibility && (
                            <RadioInputsGroup
                              label="Permission Level"
                              level={f.level}
                              branches={branches}
                              showBranches={f.level === 'branch'}
                              showSpecialty={f.level === 'specialty'}
                              showUser={f.level === 'user'}
                              mappings={f.mappings}
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
      </MainContainer>
    </>
  );
};
RolePermission.propTypes = {};

export default RolePermission;
