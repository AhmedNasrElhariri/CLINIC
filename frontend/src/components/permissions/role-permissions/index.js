import React, { useState, useRef, useEffect, useCallback } from "react";
import * as R from "ramda";
import { Toggle, Panel, Form } from "rsuite";
import { useParams } from "react-router-dom";

import { MainContainer, Div, H6, H5, CRButton, CRPanelGroup } from "components";
import RoleInput from "./createRole";

import { PERMISSIONS } from "utils/constants";
import useFetchUser from "../user-permissions/fetch-data";
import RadioInputsGroup from "components/widgets/input/radio-input";
import form from "components/accounting/form";

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
const LevelsPermissions = ["Organization", "Branch", "Specialization", "User"];

const RolePermission = () => {
  const [formValue, setFormValue] = useState(initValues);




  /*    useEffect(() => {
    setFormValue((prevState) => {
      const updatePermissions = R.pipe(
        R.filter((key) => {
          return !!permissions.find((p) => p.action + p.subject === key);
        }),
        R.map((key) => ({ [key]: true })),
        R.mergeAll
      )(Object.keys(prevState));
      return { ...prevState, ...updatePermissions };
    });
  }, [permissions]); */

  const toggle = useCallback(
    (key, val) => setFormValue({ ...formValue, [key]: val}),
    [formValue]
  );
  const value = useRef(initValue);

  const handleInvoiceChange = useCallback((sessions) => {
    value.current = { ...value.current, sessions };
  }, []);
  const handleLevelChange =   useCallback(
    (key, val) => setFormValue({ ...formValue, [key]: val}),
    [formValue]
  );
/*   const handleLevelChange = (level, actionIndex) => {
    ff[actionIndex].level = level;

    setFF((previous, idx) => {
      const newFF = previous.map((p) => p);
      return newFF;
    });

  }; */
  console.log(formValue)
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
                <Div style={{ padding: " 0 50px" }}>
                  {value.map(({ name, id, action, subject,level }) => (
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
                          checked={formValue[action + subject]}
                          onChange={(val) => toggle(action + subject, val,level)}
                        />
                      </Div>
                      { 
                         formValue[action + subject] &&

                          <RadioInputsGroup
                              label={"Permission Level"}
                              LevelsPermissions={LevelsPermissions}
                              level={formValue['level']}
                              onChange={(val) => handleLevelChange('level',val)}
                              showBranches={formValue['level'] === 'Branch'}
                              showSpecialization={formValue['level'] === 'Specialization'}
                              showUser={formValue['level'] === 'User'}

                            /> 
                    
                      }
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
