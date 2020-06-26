import React, { useState, useEffect } from 'react';
import { Toggle } from 'rsuite';
import * as R from 'ramda';

import { CRNav, Div, CRTable, H6, H3 } from 'components';
import { formatDate } from 'utils/date';
import Chart from './chart';
import { NUMBER_FIELD_TYPE } from 'utils/constants';

const getFieldValueByViewField = (data, f) => {
  const fieldData = data.find(d => d.field.id === f.id);
  return R.prop('value')(fieldData);
};

const mapToPropValue = (appointments, field) =>
  appointments.map(appointment => ({
    value: getFieldValueByViewField(appointment.data, field),
    date: formatDate(appointment.date),
  }));

function Progress({ history, viewFields }) {
  const [showChart, setShowChart] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    setActiveField(R.propOr({}, '0')(viewFields));
  }, [viewFields]);

  if (!activeField) {
    return <H6>Loading</H6>;
  }

  return (
    <Div display="flex">
      <CRNav vertical width={300} onSelect={setActiveField}>
        {viewFields.map(field => (
          <CRNav.CRVItem
            key={field.id}
            eventKey={field}
            active={activeField.id === field.id}
          >
            {field.name}
          </CRNav.CRVItem>
        ))}
      </CRNav>
      <Div flexGrow={1} p={4}>
        <H3 mb={4}>{activeField.name}</H3>
        {showChart && activeField.type === NUMBER_FIELD_TYPE ? (
          <Chart values={mapToPropValue(history, activeField)} />
        ) : (
          <Div>
            <CRTable autoHeight data={mapToPropValue(history, activeField)}>
              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
                <CRTable.CRCell dataKey="date" />
              </CRTable.CRColumn>

              <CRTable.CRColumn flexGrow={1}>
                <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
                <CRTable.CRCell dataKey="value" bold />
              </CRTable.CRColumn>
            </CRTable>
          </Div>
        )}
      </Div>
      <Div width={120} display="flex" mt="12px">
        {activeField.type === NUMBER_FIELD_TYPE && (
          <>
            <H6 color="texts.2" mr={2}>
              Chart
            </H6>
            <Toggle checked={showChart} onChange={setShowChart} />
          </>
        )}
      </Div>
    </Div>
  );
}

export default Progress;
