import React, { useState, useEffect } from 'react';
import { Toggle, Table, Divider, List } from 'rsuite';
import * as R from 'ramda';
import LineChart from '@rsuite/charts/lib/charts/LineChart';
import Line from '@rsuite/charts/lib/series/Line';
import YAxis from '@rsuite/charts/lib/components/YAxis';

import { formatDate } from 'utils/date';
import { Div } from 'components/widgets/html';
import { KeyStyled, ValueStyled } from 'components/misc';

const Value = ({ value }) => {
  return R.is(Object)(value) ? (
    <List>
      {Object.keys(value).map((key, index) => (
        <List.Item key={index} index={index}>
          <KeyStyled width={90}>{key}</KeyStyled>
          <Divider vertical />
          <ValueStyled>{value[key]}</ValueStyled>
          <KeyStyled />
        </List.Item>
      ))}
    </List>
  ) : (
    <List>
      {R.flatten([value]).map((item, index) => (
        <List.Item key={index} index={index}>
          {item}
        </List.Item>
      ))}
    </List>
  );
};

const mapToChartData = values => {
  const areMultipleLines = R.pipe(
    R.head,
    R.propOr(null, 'value'),
    R.is(Object)
  )(values);
  return values.map(({ value, date }) => {
    return [
      formatDate(date),
      ...(areMultipleLines ? R.values(value) : [value]),
    ];
  });
};

function PropProgress({ values, chart }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = mapToChartData(values);
    setData(data);
  }, [values]);

  const [showChart, setShowChart] = useState(false);

  const getLines = () => {
    const keys = R.pipe(R.head, R.propOr({}, 'value'), R.keys)(values);
    return keys.map(key => <Line name={key} key={key} />);
  };

  return (
    <Div>
      {chart && (
        <Div display="flex" justifyContent="flex-end">
          <Div mr={1}>
            <h5>Chart : </h5>
          </Div>
          <Toggle checked={showChart} onChange={setShowChart} />
        </Div>
      )}
      {showChart ? (
        <LineChart name="Page View" data={data}>
          <YAxis type="value" />
          {getLines()}
        </LineChart>
      ) : (
        <Table
          wordWrap
          data={values}
          height={420}
          autoHeight
          defaultExpandAllRows
          rowHeight={60}
        >
          <Table.Column width={200} fixed>
            <Table.HeaderCell style={{ textAlign: 'left' }}>
              Date
            </Table.HeaderCell>
            <Table.Cell dataKey="date">
              {({ date }) => formatDate(date)}
            </Table.Cell>
          </Table.Column>

          <Table.Column width={400} align="center" fixed>
            <Table.HeaderCell style={{ textAlign: 'left' }}>
              Value
            </Table.HeaderCell>
            <Table.Cell dataKey="value">
              {({ value }) => (
                <Div textAlign="left">
                  <Value value={value} />
                </Div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}
    </Div>
  );
}

export default PropProgress;
