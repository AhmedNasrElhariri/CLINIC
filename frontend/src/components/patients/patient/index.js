import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PATIENT } from 'apollo-client/queries';
import {
  Div,
  PatientSummary,
  PatientProgress,
  CRNav,
  MainContainer,
} from 'components';

import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import History from 'components/appointments/appointment/patient-history';
import Print from '../print';

const tabs = ['Summary', 'Progress', 'Labs', 'History'];

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

  const {
    appointmentHistory,
    viewFields,
    tabularFields,
    tabularData,
    normalizedAppointments,
    appointmentsWithGroups,
  } = usePatientHistory({ patientId });

  return (
    <>
      <MainContainer
        nobody
        title={patient.name}
        more={
          <Print
            appoitnments={normalizedAppointments}
            appoitnmentsWithGroups={appointmentsWithGroups}
            patient={patient}
            fields={tabularFields}
          />
        }
      ></MainContainer>
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
            {showComp('0') && (
              <PatientSummary
                summary={appointmentHistory}
                tabularFields={tabularFields}
                tabularData={tabularData}
              />
            )}
            {showComp('1') && (
              <PatientProgress
                history={appointmentHistory}
                viewFields={viewFields}
              />
            )}
            {showComp('2') && <PatientLabs patient={patient} noAdd />}
            {showComp('3') && <History patient={patient} noAdd />}
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
