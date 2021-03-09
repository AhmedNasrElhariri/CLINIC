import React, { useState, useMemo } from 'react';
import * as R from 'ramda';
import { CRButton, Div } from 'components';
import AddLabDocs from './add-lab-docs';
import useFetchLabDocs from 'hooks/fetch-lab-docs';
import { CRNav } from 'components/widgets';
import HistoryImages from './history-images';
import PendingImages from './pending-images';

const PatientImages = ({ patient}) => {
  const [activeTab, setActiveTab] = useState('0');
  return (
    <>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={'100%'}
      >
        <CRNav.CRItem eventKey="0">Pending Images</CRNav.CRItem>
        <CRNav.CRItem eventKey="1">History Images</CRNav.CRItem>
      </CRNav>
      {(() => {
        switch (activeTab) {
            case '0':
              return (
                <PendingImages patient={patient} />
              );
            default:
              return <HistoryImages patient={patient} />;
        }
      })()}
    </>
  );
};

PatientImages.propTypes = {};

export default PatientImages;
