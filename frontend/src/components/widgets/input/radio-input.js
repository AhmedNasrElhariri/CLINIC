import React, { memo } from 'react';

import { FormGroup, RadioGroup, Radio, FlexboxGrid } from 'rsuite';
import Label from '../label';
import AddSpecialityPermissions from '../../permissions/role-permissions/add-specialty-permission';
import AddUserPermissions from '../../permissions/role-permissions/add-user-permission';
import AddBranchPermissions from '../../permissions/role-permissions/add-branch-permission';

const RadioInputsGroup = ({
  label,
  onChange,
  showBranches,
  showSpecialty,
  showUser,
  branches,
  mappings,
  onAdd,
  onDelete,
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
                  mappings={mappings}
                  onAdd={onAdd}
                  onDelete={onDelete}
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
                <AddSpecialityPermissions
                  branches={branches}
                  mappings={mappings}
                  onAdd={onAdd}
                  onDelete={onDelete}
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
                    mappings={mappings}
                    onAdd={onAdd}
                    onDelete={onDelete}
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
