import React, { useState ,useMemo} from 'react';
import * as R from 'ramda';
import { CRButton, Div } from 'components';
import AddLabDocs from './add-lab-docs';
import useFetchLabDocs from 'hooks/fetch-lab-docs';
import { CRNav } from 'components/widgets';
import HistoryLabs from './history-labs';
import PendingLabs from './pending-labs';
import { GET_PATIENT_LADDOC } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';

const PatientLabs = ({ patient, noAdd = false }) => {
  const status = 'pending';
  const patientId = patient.id;
  const [visible, setVisible] = useState(false);
  const { labDocs, updateCache } = useFetchLabDocs(patient);
  const [activeTab, setActiveTab] = useState('0');
  console.log(patient.id);
  const { data } = useQuery(GET_PATIENT_LADDOC, {
    variables: { status ,patientId}
  });
  const patientLabDocs = useMemo(
    () => R.propOr([], 'patientLabDocs')(data),
    [data]
  );
  console.log(patientLabDocs);
  return (
    <>
      {/* {!noAdd && (
        <Div textAlign="right" mb={4}>
          <CRButton onClick={() => setVisible(true)} small primary>
            Add
          </CRButton>
        </Div>
      )}
      <AddLabDocs
        show={visible}
        onCancel={() => setVisible(false)}
        onAdded={newDoc => {
          setVisible(false);
          updateCache([newDoc, ...labDocs]);
        }}
        patient={patient}
      /> */}
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
            return <PendingLabs patient={patient} patientLabDocs={patientLabDocs}/>;
          default:
            return <HistoryLabs patient={patient} />;
        }
      })()}
    </>
  );
};

PatientLabs.propTypes = {};

export default PatientLabs;
