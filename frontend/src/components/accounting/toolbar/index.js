import React from 'react';

import { CRButtonGroup, Div, CRDateRangePicker } from 'components';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import { Form } from 'rsuite';

const Toolbar = ({ activeKey, onSelect, onChangePeriod }) => {
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

      <Div width={180}>
        <Form fluid>
          <CRDateRangePicker
            name=""
            label=""
            placeholder="Timeframe"
            size="sm"
            block
            small
            noLabel
            onChange={onChangePeriod}
          />
        </Form>
      </Div>
    </Div>
  );
};

Toolbar.defaultProps = {
  data: {
    revenues: [],
    expenses: [],
  },
};

export default Toolbar;
