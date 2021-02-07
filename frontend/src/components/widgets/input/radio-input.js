import React, { memo } from 'react';

import { FormGroup, RadioGroup, Radio, FlexboxGrid } from 'rsuite';
import Label from '../label';
import AddSpecializtionPermissions from '../../permissions/role-permissions/add-specialty-permission';
import AddUserPermissions from '../../permissions/role-permissions/add-user-permission';
import AddBranchPermissions from '../../permissions/role-permissions/add-branch-permission';

const RadioInputsGroup = ({
  label,
  onChange,
  showBranches,
  showSpecialty,
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
            {' '}
            <Radio value={'organization'} onChange={onChange}>
              Organization
            </Radio>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {' '}
            <Radio value={'branch'} onChange={onChange}>
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
            {' '}
            <Radio value={'specialty'} onChange={onChange}>
              Specialty
            </Radio>
          </FlexboxGrid.Item>
          {showSpecialty && (
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
            {' '}
            <Radio value={'user'} onChange={onChange}>
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
