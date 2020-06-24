import React, { useState } from 'react';
import { Toggle } from 'rsuite';

import { CRNav, Div, CRTable, H6 } from 'components';
import { formatDate } from 'utils/date';
import Chart from './chart';
import { NUMBER_FIELD_TYPE } from 'utils/constants';

const getFieldValueByViewField = (data, f) =>
  data.find(d => d.field.id === f.id).value;

const mapToPropValue = (appointments, field) =>
  appointments.map(appointment => ({
    value: getFieldValueByViewField(appointment.data, field),
    date: formatDate(appointment.date),
  }));

function Progress({ history, viewFields }) {
  const [showChart, setShowChart] = useState(false);

  const field = viewFields[0];

  return (
    <Div display="flex">
      <CRNav vertical width={300}>
        {viewFields.map((field, idx) => (
          <CRNav.CRVItem>{field.name}</CRNav.CRVItem>
        ))}
      </CRNav>
      <Div flexGrow={1}>
        {showChart ? (
          <Chart
            values={mapToPropValue(history, field)}
            chart={field.type === NUMBER_FIELD_TYPE}
          />
        ) : (
          <CRTable
            autoHeight
            data={mapToPropValue(history, viewFields[0])}
            onRowClick={({ id }) => {
              history.push(`/patients/${id}`);
            }}
          >
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
              <CRTable.CRCell dataKey="date" />
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
              <CRTable.CRCell dataKey="value" bold />
            </CRTable.CRColumn>
          </CRTable>
        )}
      </Div>
      <Div width={120} display="flex" mt="12px">
        <H6 color="texts.2" mr={2}>
          Chart
        </H6>
        <Toggle checked={showChart} onChange={setShowChart} />
      </Div>
    </Div>
  );
}

export default Progress;
