import React, { useState, useCallback } from 'react';
import * as R from 'ramda';
import {
  useParams,
  useHistory,
  useLocation,
  Switch,
  Route,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PATIENT } from 'apollo-client/queries';
import {
  Div,
  CRNav,
  CRButton,
  MainContainer,
  PatientSummary,
} from 'components';
import AvatarWithName from '../patient-avatar-with-name/index';
import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import History from 'components/appointments/appointment/patient-history';
import PatientSurgries from 'components/appointments/appointment/surgries';
import useQueryParams from 'hooks/useQueryParams';

const tabs = ['Patient Info', 'Sessions', 'Surgries', 'Labs', 'History'];

function Appointment() {
  const history = useHistory();
  let { patientId } = useParams();
  let { appointmentId } = useQueryParams();
  const { data } = useQuery(GET_PATIENT, {
    variables: {
      id: patientId,
    },
  });
  const [activeTab, setActiveTab] = useState('0');
  const showComp = useCallback(idx => activeTab === idx, [activeTab]);
  const patient = R.propOr({}, 'patient')(data);

  const { viewFields, appointmentHistory } = usePatientHistory({ patientId });

  return (
    <>
      <MainContainer
        nobody
        more={
          <>
            <AvatarWithName patient={patient} />
            {appointmentId && (
              <CRButton
                onClick={() => history.push(`/appointments/${appointmentId}`)}
                small
                primary
              >
                Current Appointment
              </CRButton>
            )}
          </>
        }
      ></MainContainer>

      <Switch>
        <Route exact path="/patients/:id">
          {() => (
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
                  {showComp('0') && <PatientInfo patient={patient} />}
                  {showComp('1') && (
                    <PatientSummary summary={appointmentHistory} />
                  )}
                  {showComp('2') && (
                    <PatientSurgries
                      history={appointmentHistory}
                      viewFields={viewFields}
                      patientId={patient?.id}
                    />
                  )}
                  {showComp('3') && <PatientLabs patient={patient} />}
                  {showComp('4') && <History patient={patient} />}
                </Div>
              </Div>
            </Div>
          )}
        </Route>
        <Route path="/patients/:id/:appointmentId">
          {() => <div>hello</div>}
        </Route>
      </Switch>
    </>
  );
}

export default Appointment;
