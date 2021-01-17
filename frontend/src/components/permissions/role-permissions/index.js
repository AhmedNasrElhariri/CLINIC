import React, { useState, useRef, useCallback } from 'react';
import * as R from 'ramda';
import { Toggle, Panel, Form } from 'rsuite';

import { MainContainer, Div, H6, H5, CRButton, CRPanelGroup } from 'components';
import RoleInput from './createRole';

import { PERMISSIONS } from 'utils/constants';
import RadioInputsGroup from 'components/widgets/input/radio-input';
import useFetchAppointments from '../../../hooks/fetch-appointments';

const appPermissions = PERMISSIONS;
const flattenPermission = R.flatten([...appPermissions.values()]);

const initValues = R.pipe(
  R.map(({ id }) => ({ [id]: false })),
  R.mergeAll
)(flattenPermission);
const initValue = {
  sessions: [],
  items: [],
};
const LevelsPermissions = [
  {
    name: 'Organization',
    haveBranch: false,
    haveSpecialty: false,
    haveUser: false,
  },
  {
    name: 'Branch',
    haveBranch: true,
    haveSpecialty: false,
    haveUser: false,
  },
  {
    name: 'Specialty',
    haveBranch: true,
    haveSpecialty: true,
    haveUser: false,
  },
  {
    name: 'User',
    haveBranch: true,
    haveSpecialty: false,
    haveUser: true,
  },
];

const RolePermission = () => {
  const [formValue, setFormValue] = useState(initValues);
  const { branches } = useFetchAppointments();

  const [ff, setFF] = useState(flattenPermission);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggle = (visibility, actionIndex) => {
    ff[actionIndex].visibility = !visibility;

    setFF((previous, idx) => {
      const newFF = previous.map(p => p);
      return newFF;
    });
  };

  const value = useRef(initValue);
  const handleSelect = useCallback(sessions => {
    value.current = { ...value.current, sessions };
  }, []);

  const handleLevelChange = (level, actionIndex) => {
    ff[actionIndex].level = level;
    ff[actionIndex].mappings = [];
    setSelectedItems([]);

    setFF((previous, idx) => {
      const newFF = previous.map(p => p);
      return newFF;
    });
  };
  const handleAddBranch = (branchId, index) => {
    let mappings = ff[index].mappings;

    if (ff[index].mappings.length !== 1) {
      mappings = [];
    }
    mappings = [...mappings, branchId];
    setFF(previous => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      setSelectedItems(mappings);
      return newFF;
    });
  };

  const handleAddSpecializtion = (value, index) => {
    let mappings = ff[index].mappings;
    if (ff[index].mappings.length !== 1) {
      mappings = [];
    }
    mappings = [...mappings, value];
    setFF(previous => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      setSelectedItems(mappings);
      return newFF;
    });
  };
  const handleAddUser = (value, index) => {
    let mappings = ff[index].mappings;
    if (ff[index].mappings.length !== 1) {
      mappings = [];
    }
    mappings = [...mappings, value];
    setFF(previous => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      setSelectedItems(mappings);

      return newFF;
    });
  };
  const handleDeleteSelected = useCallback(idx => {}, []);
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

        <Form formValue={formValue}>
          {[...appPermissions.entries()].map(([subject, value]) => (
            <CRPanelGroup accordion style={{ marginBottom: 30 }} key={subject}>
              <Panel
                header={
                  <H5 fontWeight={600} px={4} py={3}>
                    {subject}
                  </H5>
                }
              >
                <Div style={{ padding: ' 0 50px' }}>
                  {value.map(({ name, id, visibility }, index) => (
                    <>
                      <Div
                        key={id}
                        display="flex"
                        justifyContent="space-between"
                        height={70}
                      >
                        <H6>{name}</H6>
                        <Toggle
                          size="md"
                          checked={ff[visibility]}
                          onChange={val => toggle(visibility, index)}
                        />
                      </Div>
                      {visibility &&
                        ff
                          .filter((item, index) => item.name === name)
                          .map(f => (
                            <RadioInputsGroup
                              handleSelect={handleSelect}
                              label={'Permission Level'}
                              LevelsPermissions={LevelsPermissions}
                              onChange={level =>
                                handleLevelChange(level, index)
                              }
                              onAddBranch={value =>
                                handleAddBranch(value, index)
                              }
                              onAddUser={value => handleAddUser(value, index)}
                              onAddSpecailization={value =>
                                handleAddSpecializtion(value, index)
                              }
                              handleDeleteSelected={handleDeleteSelected(index)}
                              level={f.level}
                              branches={branches}
                              selectedItems={selectedItems}
                              showBranches={f.level === 'branch'}
                              showSpecialty={f.level === 'specialty'}
                              showUser={f.level === 'user'}
                            />
                          ))}
                    </>
                  ))}
                </Div>
              </Panel>
            </CRPanelGroup>
          ))}
        </Form>
      </MainContainer>
    </>
  );
};
RolePermission.propTypes = {};

export default RolePermission;
