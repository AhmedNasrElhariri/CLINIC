import React from 'react';
import { PanelGroup, Panel } from 'rsuite';

import { toTitleCase } from 'utils/text';
import PropProgress from './prop-progress';

const getValues = [
  'vitalData',
  'labs',
  'complain',
  'signs',
  'diagnosis',
  'treatment',
  'recommendations',
];

const mapToPropValue = (history, prop) =>
  history.map(h => ({ value: h[prop], date: h.date }));

const renderProps = history => {
  return getValues.map((key, idx) => (
    <Panel key={idx} header={toTitleCase(key)}>
      <PropProgress values={mapToPropValue(history, key)} />
    </Panel>
  ));
};

function Progress({ history }) {
  return (
    <PanelGroup accordion bordered>
      {renderProps(history)}
    </PanelGroup>
  );
}

export default Progress;
