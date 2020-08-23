import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';
import { Toggle, Panel, Form } from 'rsuite';
import { useParams } from 'react-router-dom';

import { MainContainer, Div, H6, H5, CRButton, CRPanelGroup } from 'components';
import { PERMISSIONS } from 'utils/constants';
import useFetchUser from './fetch-data';

const appPermissions = PERMISSIONS;
const flattenPermission = R.flatten([...appPermissions.values()]);
const initValues = R.pipe(
  R.map(({ id }) => ({ [id]: false })),
  R.mergeAll
)(flattenPermission);

const UserPermissions = () => {
  const { userId } = useParams();
  const { user, permissions, setUserPermissions } = useFetchUser(userId);

  const [formValue, setFormValue] = useState(initValues);

  useEffect(() => {
    setFormValue(prevState => {
      const updatePermissions = R.pipe(
        R.filter(key => {
          return !!permissions.find(p => p.action + p.subject === key);
        }),
        R.map(key => ({ [key]: true })),
        R.mergeAll
      )(Object.keys(prevState));
      return { ...prevState, ...updatePermissions };
    });
  }, [permissions]);

  const toggle = useCallback(
    (key, val) => setFormValue({ ...formValue, [key]: val }),
    [formValue]
  );

  const handleSave = useCallback(() => {
    const newPermissions = R.pipe(
      R.filter(({ id }) => formValue[id]),
      R.map(R.pick(['action', 'subject']))
    )(flattenPermission);
    setUserPermissions(userId, newPermissions);
  }, [formValue, setUserPermissions, userId]);

  return (
    <>
      <MainContainer
        title={`${user.name} Permissions`}
        more={<CRButton onClick={handleSave}>Save</CRButton>}
      >
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
                  {value.map(({ name, id, action, subject }) => (
                    <Div
                      key={id}
                      display="flex"
                      justifyContent="space-between"
                      height={70}
                    >
                      <H6>{name}</H6>
                      <Toggle
                        size="md"
                        checked={formValue[action + subject]}
                        onChange={val => toggle(action + subject, val)}
                      />
                    </Div>
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

UserPermissions.propTypes = {};

export default UserPermissions;
