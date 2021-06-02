import React from 'react';

import { CRButtonGroup, Div } from 'components';
import { ACCOUNTING_VIEWS } from 'utils/constants';

const Toolbar = ({ activeKey, onSelect}) => {
  return (
    <Div display="flex">
      <CRButtonGroup onSelect={onSelect} activeKey={activeKey}>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.DAY}>
          Today
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.WEEK}>
          Week
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.MONTH}>
          Month
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.QUARTER}>
          Quarter
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.YEAR}>
          Year
        </CRButtonGroup.CRButton>
      </CRButtonGroup>
    </Div>
  );
};



export default Toolbar;
