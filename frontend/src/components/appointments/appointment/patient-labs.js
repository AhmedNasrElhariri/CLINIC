import React, { useState, useMemo } from 'react';
import * as R from 'ramda';
import useFetchLabDocs from 'hooks/fetch-lab-docs';
import { CRNav } from 'components/widgets';
import HistoryLabs from './history-labs';
import PendingLabs from './pending-labs';

const PatientLabs = ({ patient, noAdd = false }) => {
  const [activeTab, setActiveTab] = useState('0');
  return (
    <>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={'100%'}
      >
        <CRNav.CRItem eventKey="0">Pending Labs</CRNav.CRItem>
        <CRNav.CRItem eventKey="1">History Labs</CRNav.CRItem>
      </CRNav>
      {(() => {
        switch (activeTab) {
          case '0':
            return (
              <PendingLabs patient={patient} />
            );
          default:
            return <HistoryLabs patient={patient} />;
        }
      })()}
    </>
  );
};

PatientLabs.propTypes = {};

export default PatientLabs;
