import React from 'react';

import { CRButtonGroup, Div, CRButton } from 'components';

const Toolbar = ({ onAdd, activeKey, onSelect }) => {
  return (
    <Div display="flex" justifyContent="space-between">
      <CRButtonGroup onSelect={onSelect} activeKey={activeKey}>
        <CRButtonGroup.CRButton eventKey="0">Today</CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey="1">Week</CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey="2">Month</CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey="3">Quarter</CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey="4">Year</CRButtonGroup.CRButton>
      </CRButtonGroup>
      <CRButton primary small onClick={onAdd}>
        Add
      </CRButton>
    </Div>
  );
};

Toolbar.propTypes = {};

export default Toolbar;
