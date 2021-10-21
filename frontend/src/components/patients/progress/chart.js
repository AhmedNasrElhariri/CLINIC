import React, { useState, useEffect } from 'react';
import * as R from 'ramda';

import YAxis from '@rsuite/charts/lib/components/YAxis';

import BarChart from '@rsuite/charts/lib/charts/BarChart';
import PieChart from '@rsuite/charts/lib/charts/PieChart';
import LineChart from '@rsuite/charts/lib/charts/LineChart';
import Bars from '@rsuite/charts/lib/series/Bars';
import Line from '@rsuite/charts/lib/series/Line';

const mapToChartData = values => {
  const areMultipleLines = R.pipe(
    R.head,
    R.propOr(null, 'value'),
    R.is(Object)
  )(values);
  return values.map(({ value, date }) => {
    return [date, ...(areMultipleLines ? R.values(value) : [value])];
  });
};

function PropProgress({ values }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = mapToChartData(values);
    setData(data);
  }, [values]);

  return (
    <>
      <BarChart data={data}>
        <YAxis />
        <Bars barWidth={6} />
      </BarChart>
      {/* <PieChart name="Pie Chart" data={data} /> */}
      <LineChart data={data}>
        <Line name="date" area />
        <Line name="value" area />
      </LineChart>
    </>
  );
}

export default PropProgress;
