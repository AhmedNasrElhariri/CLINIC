import React from 'react';

import { CRTable } from 'components';

const Payslips = ({ payslips }) => {
  return (
    <CRTable autoHeight data={payslips}>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="name" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="amount" semiBold />
      </CRTable.CRColumn>
    </CRTable>
  );
};

Payslips.defaultProps = {
  payslips: [],
};

export default Payslips;
