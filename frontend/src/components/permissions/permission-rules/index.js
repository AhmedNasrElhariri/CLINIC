import React, { memo } from 'react';

import { FormGroup, RadioGroup, FlexboxGrid } from 'rsuite';
import { CRLabel } from 'components';
import AddSpecialityPermissions from '../role-permissions/add-specialty-permission';
import AddUserPermissions from '../role-permissions/add-user-permission';
import AddBranchPermissions from '../role-permissions/add-branch-permission';
import { PERMISSION_LEVELS } from 'utils/constants';

import { RadioStyled } from './style';

const PermissionRules = ({
  label,
  onChange,
  level,
  branches,
  rules,
  onAdd,
  onDelete,
}) => {
  return (
    <FormGroup>
      <CRLabel>{label}</CRLabel>
      <RadioGroup name="radioList" value={level} onChange={onChange}>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            <RadioStyled value={PERMISSION_LEVELS.ORGNIZATION}>
              <span>Organization</span>
            </RadioStyled>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            <RadioStyled value={PERMISSION_LEVELS.BRANCH}>branch</RadioStyled>
          </FlexboxGrid.Item>
          {level === PERMISSION_LEVELS.BRANCH && (
            <FlexboxGrid.Item colspan={20}>
              <AddBranchPermissions
                branches={branches}
                rules={rules}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            </FlexboxGrid.Item>
          )}
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            <RadioStyled value={PERMISSION_LEVELS.SPECIALTY}>
              Specialty
            </RadioStyled>
          </FlexboxGrid.Item>
          {level === PERMISSION_LEVELS.SPECIALTY && (
            <FlexboxGrid.Item colspan={20}>
              <AddSpecialityPermissions
                branches={branches}
                rules={rules}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            </FlexboxGrid.Item>
          )}
        </FlexboxGrid>
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item colspan={4}>
            <RadioStyled value={PERMISSION_LEVELS.USER}>User</RadioStyled>
          </FlexboxGrid.Item>
          {level === PERMISSION_LEVELS.USER && (
            <FlexboxGrid.Item colspan={20}>
              <AddUserPermissions
                branches={branches}
                rules={rules}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            </FlexboxGrid.Item>
          )}
        </FlexboxGrid>
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(PermissionRules);
