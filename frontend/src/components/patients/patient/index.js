import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import { useParams,useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PATIENT,GET_APPOINTMENT } from 'apollo-client/queries';
import {
  Div,
  PatientSummary,
  PatientProgress,
  CRNav,
  CRButton,
  MainContainer,
} from 'components';
import AvatarWithName from '../patient-avatar-with-name/index'
import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import History from 'components/appointments/appointment/patient-history';
import Print from '../print';
import Sessions from '../sessions'
import {appointmentHistory} from '../../../utils/constants'
const tabs = ['Patient Info','Sessions', 'Progress', 'Labs', 'History'];

function Appointment() {
  const history = useHistory();
  let { patientId } = useParams();
  const { data } = useQuery(GET_PATIENT,{
    variables: {
      id: patientId,

    },
  });
  const [activeTab, setActiveTab] = useState('0');
  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const patient = R.propOr({}, 'patient')(data);

  const {
    
    viewFields,
    tabularFields,
    tabularData,
    normalizedAppointments,
    appointmentsWithGroups,
  } = usePatientHistory({ patientId });
const appoinmentId = '0a63eaa1-1cfc-40a2-9fe0-4ed2269a4397'
  return (
    <>
       <MainContainer
        nobody
        more={
          <>
          <AvatarWithName patient={patient}/>
          <CRButton  onClick={() =>  history.push(`/appointments/${appoinmentId}`)} small>Add New Sessions</CRButton>
          </>
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
              <PatientInfo
               patient={patient}
              />
            )}
            {showComp('1') && (
            
              <Sessions summary={appointmentHistory} />
            )}
            {showComp('2') && (
              <PatientProgress
                history={appointmentHistory}
                viewFields={viewFields}
              />
            )}
            {showComp('3') && <PatientLabs patient={patient} />}
            {showComp('4') && <History patient={patient} />}
          </Div>
        </Div>
      </Div>
    </>
  );
}

export default Appointment;
