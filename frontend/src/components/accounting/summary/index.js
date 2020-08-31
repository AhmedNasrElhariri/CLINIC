import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import PieChart from '@rsuite/charts/lib/charts/PieChart';

import { Div, H5, CRVDivider } from 'components';

const Box = ({ name, value }) => (
  <Div display="flex" alignItems="center" mb={3}>
    <H5 width={150} textAlign="right" fontWeight={400}>
      {name}
    </H5>
    <CRVDivider />
    <H5 ml={3} fontWeight={800}>
      {value}
    </H5>
  </Div>
);

const getRevenuePercentage = ({ revenues, expenses }) =>
  Math.round((revenues / (revenues + expenses)) * 100 * 100) / 100;

const Summary = ({ expenses, revenues }) => {
  const revenuePercentage = getRevenuePercentage({ revenues, expenses });

  return (
    <Div display="flex">
      <Div width="50%">
        <Box
          name="Revenue"
          value={
            <NumberFormat
              value={revenues}
              displayType={'text'}
              thousandSeparator
            />
          }
        />
        <Box
          name="Expenses"
          value={
            <NumberFormat
              value={expenses}
              displayType={'text'}
              thousandSeparator
            />
          }
        />
        <Box
          name="Profit"
          value={
            <NumberFormat
              value={revenues - expenses}
              displayType={'text'}
              thousandSeparator
            />
          }
        />
      </Div>
      <Div width="50%">
        <PieChart
          name="Revenue vs Expenses"
          data={[
            ['Revenue', revenuePercentage, '%'],
            ['Expenses', 100 - revenuePercentage, '%'],
          ]}
          startAngle={210}
        />
      </Div>
    </Div>
  );
};

Summary.propTypes = {
  expenses: PropTypes.number.isRequired,
  revenues: PropTypes.number.isRequired,
};

export default Summary;
