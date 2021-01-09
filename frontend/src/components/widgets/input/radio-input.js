import React, { useState, memo, useCallback } from "react";
import * as R from "ramda";

import {
  FormGroup,
  RadioGroup,
  Radio,
  Form,
  Divider,
  FormControl,
  InputGroup,
  Icon,
  Col,
  FlexboxGrid,
} from "rsuite";
import Label from "../label";
import { InputStyled, InputGroupStyled } from "./style";
import { CRSelectInput, H6, CRButton, Div, H5, H7 } from "components";
import ListSelectionItems from "../../permissions/list-selections-items/index";
import AddSpecializtionPermissions from "../../permissions/role-permissions/add-specialization-permission";
import AddUserPermissions from "../../permissions/role-permissions/add-user-permission";
const RadioInputsGroup = ({
  label,
  handleSelect,
  level,
  onChange,
  onBranchChange,
  showBranches,
  showSpecialization,
  showUser,
  branches,
  selectSpecializations,
  onAddSpecailization,
  onAddUser,
}) => {
  const [session, setSession] = useState({});
  const [selectedSessions, setSelectedSessions] = useState([]);

  const handleOnChange = useCallback(
    (sessions) => {
      setSelectedSessions(sessions);
      handleSelect(sessions);
      setSession({});
    },
    [handleSelect]
  );
  const add = useCallback(() => {
    if (!session) {
      return;
    }
    handleOnChange([...selectedSessions, session]);
  }, [handleOnChange, selectedSessions, session]);

  const handleDelete = useCallback(
    (idx) => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  return (
    <FormGroup>
      <Label>{label}</Label>
      <RadioGroup name="radioList">
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"organization"} onChange={onChange}>
              Organization
            </Radio>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"branch"} onChange={onChange}>
              branch
            </Radio>
          </FlexboxGrid.Item>
          {showBranches && (
            <>
              <FlexboxGrid.Item colspan={20}>
                <FlexboxGrid align="middle" >
                  <FlexboxGrid.Item colspan={6}>
                    {" "}
                    <CRSelectInput
                      placeholder="Select Branch"
                      block
                      cleanable={false}
                      searchable={false}
                      value={session}
                      labelKey="name"
                      valueKey="id"
                      onChange={onBranchChange}
                      data={branches}
                    />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={4}>
                    {" "}
                    <CRButton primary small onClick={add}>
                      + Add New
                    </CRButton>
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={22}>
                    {" "}
                    <ListSelectionItems
                      items={selectedSessions}
                      onDelete={handleDelete}
                    />
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>
            </>
          )}
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"specialization"} onChange={onChange}>
              Specialization
            </Radio>
          </FlexboxGrid.Item>
          {showSpecialization && (
            <>
              <FlexboxGrid.Item colspan={20}>
                <AddSpecializtionPermissions
                  branches={branches}
                  selectSpecializations={selectSpecializations}
                  onAdd={onAddSpecailization}
                />
              </FlexboxGrid.Item>
            </>
          )}
        </FlexboxGrid>
        <FlexboxGrid align="middle" >
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"user"} onChange={onChange}>
              User
            </Radio>
          </FlexboxGrid.Item>
          {showUser && (
            <>
              <>
                <FlexboxGrid.Item colspan={20}>
                  <AddUserPermissions
                    branches={branches}
                    onAdd={onAddUser}
                  />
                </FlexboxGrid.Item>
              </>
            </>
          )}
        </FlexboxGrid>
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(RadioInputsGroup);
