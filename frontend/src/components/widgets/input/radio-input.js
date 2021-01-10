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
import AddBranchPermissions from "../../permissions/role-permissions/add-branch-permission";

const RadioInputsGroup = ({
  label,
  handleSelect,
  level,
  onChange,
  showBranches,
  showSpecialization,
  showUser,
  branches,
  selectedItems,
  onAddBranch,
  onAddSpecailization,
  onAddUser,
  handleDeleteSelected,
}) => {
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
                <AddBranchPermissions
                  branches={branches}
                  selectedItems={selectedItems}
                  onAdd={onAddBranch}
                  onDelete={handleDeleteSelected}
                />
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
                  selectedItems={selectedItems}
                  onAdd={onAddSpecailization}
                />
              </FlexboxGrid.Item>
            </>
          )}
        </FlexboxGrid>
        <FlexboxGrid align="middle">
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
                    selectedItems={selectedItems}
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
