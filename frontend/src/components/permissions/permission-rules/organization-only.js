import React, { memo } from 'react';

import { FormGroup, RadioGroup, FlexboxGrid } from 'rsuite';
import { CRLabel } from 'components';
import { PERMISSION_LEVELS } from 'utils/constants';

import { RadioStyled } from './style';

const PermissionRulesRelatedByOrganizationOnly = ({
  label,
  onChange,
  level,
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
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(PermissionRulesRelatedByOrganizationOnly);
