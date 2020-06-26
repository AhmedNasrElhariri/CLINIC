import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_PATIENT } from 'apollo-client/queries';
import { Div, PatientSummary, PatientProgress, H3 } from 'components';
import CRNav from '../../widgets/nav/index';

import usePatientHistory from './use-patient-history';
import PatientInfo from '../../appointments/appointment/patient-info';

const tabs = ['History', 'Progress'];

function Appointment() {
  let { patientId } = useParams();
  const { data } = useQuery(GET_PATIENT, {
    variables: {
      id: patientId,
    },
  });

  const [activeTab, setActiveTab] = useState('0');
  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const patient = R.propOr({}, 'patient')(data);

  const { appointmentHistory, viewFields } = usePatientHistory({ patientId });

  return (
    <>
      <H3 mb={64}>{patient.name}</H3>
      <Div display="flex">
        <Div flexGrow={1}>
          <Div display="flex" justifyContent="space-between">
            <CRNav
              appearance="tabs"
              activeKey={activeTab}
              onSelect={setActiveTab}
            >
              {tabs.map((t, idx) => (
                <CRNav.CRItem eventKey={idx + ''} key={idx}>
                  {t}
                </CRNav.CRItem>
              ))}
            </CRNav>
          </Div>
          <Div py={3} bg="white">
            {showComp('0') && <PatientSummary summary={appointmentHistory} />}
            {showComp('1') && (
              <PatientProgress
                history={appointmentHistory}
                viewFields={viewFields}
              />
            )}
          </Div>
        </Div>
        <Div width={325} ml={64}>
          <PatientInfo patient={patient} />
        </Div>
      </Div>
    </>
  );
}

export default Appointment;
