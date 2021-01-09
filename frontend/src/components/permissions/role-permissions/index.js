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
import useFetchAppointments from "../../../hooks/fetch-appointments";

const appPermissions = PERMISSIONS;
console.log(R)
const flattenPermission = R.flatten([...appPermissions.values()]);
console.log(flattenPermission)

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
    name: "Organization",
    haveBranch: false,
    haveSpecialization: false,
    haveUser: false,
  },
  {
    name: "Branch",
    haveBranch: true,
    haveSpecialization: false,
    haveUser: false,
  },
  {
    name: "Specialization",
    haveBranch: true,
    haveSpecialization: true,
    haveUser: false,
  },
  {
    name: "User",
    haveBranch: true,
    haveSpecialization: false,
    haveUser: true,
  },
];

const RolePermission = () => {
  const [formValue, setFormValue] = useState(initValues);
  const { branches, doctors, specializations } = useFetchAppointments();

  const [ff, setFF] = useState(flattenPermission);

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

  const toggle = (visibility, actionIndex) => {
    ff[actionIndex].visibility = !visibility;

    setFF((previous, idx) => {
      const newFF = previous.map((p) => p);
      return newFF;
    });
  };

  const value = useRef(initValue);
  const handleSelect = useCallback((sessions) => {
    value.current = { ...value.current, sessions };
  }, []);

  const handleLevelChange = (level, actionIndex) => {
    ff[actionIndex].level = level;
    ff[actionIndex].mappings = [];

    setFF((previous, idx) => {
      const newFF = previous.map((p) => p);
      return newFF;
    });
  };
  const handleSelectBranch = (branchId, index) => {
    let mappings = ff[index].mappings;

    if (ff[index].mappings.length !== 1) {
      mappings = [{ branchIds: [] }];
    }
    const branchIds = [...mappings[0].branchIds, branchId];
    mappings = [{ branchIds }];
    setFF((previous) => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      return newFF;
    });
  };

  const handleAddSpecializtion = (value, index) => {
    let mappings = ff[index].mappings;
    if (ff[index].mappings.length !== 1) {
      mappings = [];
    }
    mappings = [...mappings, value];
    setFF((previous) => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      return newFF;
    });
  };
  const handleAddUser = (value, index) => {
    let mappings = ff[index].mappings;
    if (ff[index].mappings.length !== 1) {
      mappings = [];
    }
    mappings = [...mappings, value];
    setFF((previous) => {
      const newFF = previous.map((p, i) =>
        i === index ? { ...p, mappings } : p
      );
      return newFF;
    });
  };

  console.log(ff);
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
                          onChange={(val) => toggle(visibility, index)}
                        />
                      </Div>
                      {visibility &&
                        ff
                          .filter((item, index) => item.name === name)
                          .map((f) => (
                            <RadioInputsGroup
                              handleSelect={handleSelect}
                              label={"Permission Level"}
                              LevelsPermissions={LevelsPermissions}
                              onChange={(level) =>
                                handleLevelChange(level, index)
                              }
                              onBranchChange={(branch) =>
                                handleSelectBranch(branch, index)
                              }
                              onAddUser={(value) => handleAddUser(value, index)}
                              onAddSpecailization={(value) =>
                                handleAddSpecializtion(value, index)
                              }
                              level={f.level}
                              showBranches={f.level === "branch"}
                              branches={branches}
                              showSpecialization={f.level === "specialization"}
                              showUser={f.level === "user"}
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
