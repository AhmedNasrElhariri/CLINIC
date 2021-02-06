import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PATIENT } from 'apollo-client/queries';
import { Div, PatientSummary, CRNav, MainContainer } from 'components';

import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import History from 'components/appointments/appointment/patient-history';
import PatientSurgries from 'components/appointments/appointment/surgries';
import Print from '../print';

const tabs = ['Summary', 'Surgeries', 'Labs', 'History'];

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

  console.log('normalizedAppointments', normalizedAppointments);

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
          <CRNav
            appearance="tabs"
            activeKey={activeTab}
            onSelect={setActiveTab}
            justified
          >
            {tabs.map((t, idx) => (
              <CRNav.CRItem eventKey={idx + ''} key={idx}>
                {t}
              </CRNav.CRItem>
            ))}
          </CRNav>
          <Div py={3} bg="white">
            {showComp('0') && (
              <PatientSummary
                summary={appointmentHistory}
                tabularFields={tabularFields}
                tabularData={tabularData}
              />
            )}
            {showComp('1') && (
              <PatientSurgries
                history={appointmentHistory}
                viewFields={viewFields}
                patientId={patient?.id}
              />
            )}
            {showComp('2') && <PatientLabs patient={patient} />}
            {showComp('3') && <History patient={patient} />}
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
