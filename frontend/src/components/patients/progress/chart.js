import React, { useState, useEffect } from 'react';
import * as R from 'ramda';

import YAxis from '@rsuite/charts/lib/components/YAxis';

import BarChart from '@rsuite/charts/lib/charts/BarChart';
import Bars from '@rsuite/charts/lib/series/Bars';

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
    <BarChart data={data}>
      <YAxis />
      <Bars barWidth={6} />
    </BarChart>
  );
}

export default PropProgress;
