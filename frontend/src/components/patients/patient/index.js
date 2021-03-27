import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { useParams, useHistory, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PATIENT } from 'apollo-client/queries';
import {
  Div,
  CRVNav,
  CRButton,
  MainContainer,
  PatientSummary,
} from 'components';
import AvatarWithName from '../patient-avatar-with-name/index';
import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import PatientImages from 'components/appointments/appointment/patient-images';
import History from 'components/appointments/appointment/patient-history';
import PatientSurgries from 'components/appointments/appointment/surgries';
import { appointmentHistory } from '../../../utils/constants';
import useQueryParams from 'hooks/useQueryParams';

const tabs = [
  'Patient Info',
  'Sessions',
  'Surgries',
  'Labs',
  'History',
  'Images',
];
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TabContainer = styled.div`
  width: 950px;
`;
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
  const { viewFields } = usePatientHistory({ patientId });

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
                variant="primary"
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
            <Container>
              <CRVNav
                appearance="tabs"
                activeKey={activeTab}
                onSelect={setActiveTab}
                justified
                vertical
              >
                {tabs.map((t, idx) => (
                  <CRVNav.CRItem eventKey={idx + ''} key={idx}>
                    {t}
                  </CRVNav.CRItem>
                ))}
              </CRVNav>
              <TabContainer>
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
                {showComp('5') && <PatientImages patient={patient} />}
              </TabContainer>
            </Container>
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
