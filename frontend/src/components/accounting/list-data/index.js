import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { H5, CRTable } from 'components';
import { formatDate } from 'utils/date';

const AddExpense = ({ title, data }) => {
  return (
    <div>
      <H5 mb={3} textAlign="center">
        {title}
      </H5>
      <CRTable autoHeight data={data} cellBordered>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Amount</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="amount" bold />
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </div>
  );
};

AddExpense.propTypes = {};

export default AddExpense;
