import React from 'react';
import { PanelGroup, Panel } from 'rsuite';

import { toTitleCase } from 'utils/text';
import PropProgress from './prop-progress';
import { NUMBER_FIELD_TYPE } from 'utils/constants';

const getFieldValueByViewField = (data, f) =>
  data.find(d => d.field.id === f.id).value;

const mapToPropValue = (appointments, field) =>
  appointments.map(appointment => ({
    value: getFieldValueByViewField(appointment.data, field),
    date: appointment.date,
  }));

function Progress({ history, viewFields }) {
  return (
    <PanelGroup accordion bordered>
      {viewFields.map((field, idx) => (
        <Panel key={idx} header={toTitleCase(field.name)}>
          <PropProgress
            values={mapToPropValue(history, field)}
            chart={field.type === NUMBER_FIELD_TYPE}
          />
        </Panel>
      ))}
    </PanelGroup>
  );
}

export default Progress;
