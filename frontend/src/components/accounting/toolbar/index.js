import React from 'react';

import { CRButtonGroup, Div, CRButton } from 'components';
import PdfView from './pdf';
import { ACCOUNTING_VIEWS } from 'utils/constants';

const Toolbar = ({ activeKey, onAddExpense, onAddRevenue, onSelect, data }) => {
  return (
    <Div display="flex" justifyContent="space-between">
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
      <Div>
        <CRButton primary small onClick={onAddExpense}>
          + Expense
        </CRButton>
        <CRButton primary small onClick={onAddRevenue} ml={1}>
          + Reveneue
        </CRButton>
        <Div ml={1}>
          <PdfView data={data} />
        </Div>
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
