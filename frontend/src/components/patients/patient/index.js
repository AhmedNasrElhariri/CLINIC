import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { useParams, useHistory, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Can } from 'components/user/can';
import { GET_PATIENT } from 'apollo-client/queries';
import { CRVNav, CRButton, MainContainer, PatientSummary } from 'components';
import AvatarWithName from '../patient-avatar-with-name/index';
import usePatientHistory from './use-patient-history';
import PatientInfo from '../patient-info';
import Dental from '../dental';
import PatientLabs from 'components/appointments/appointment/patient-labs';
import PatientImages from 'components/appointments/appointment/patient-images';
import History from 'components/appointments/appointment/patient-history';
import PatientCourses from 'components/appointments/appointment/patient-courses';
import PatientSurgries from 'components/appointments/appointment/surgries';
import SessionsPulses from '../sessions-pulses';
import PatientProgress from '../progress';
import { useQueryParams, useHospitals } from 'hooks';

const tabs = [
  'Patient Info',
  'Sessions',
  'Surgries',
  'Labs',
  'Images',
  'History',
  'Courses',
  'Sessions Pulses',
  'Dental',
  'Progress',
];
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TabContainer = styled.div`
  width: 100%;
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
  const { viewFields, appointmentHistory } = usePatientHistory({ patientId });
  const { hospitals } = useHospitals({});
  const tabularFields = [
    { id: 'name', name: 'name' },
    { id: 'address', name: 'address' },
  ];

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
                  <Can I="ViewSessions" an="Patient">
                    <PatientSummary
                      summary={appointmentHistory}
                      tabularFields={tabularFields}
                      tabularData={hospitals}
                    />
                  </Can>
                )}
                {showComp('2') && (
                  <PatientSurgries
                    history={[]}
                    viewFields={viewFields}
                    patientId={patient?.id}
                  />
                )}
                {showComp('3') && (
                  <Can I="ViewLabs" an="Patient">
                    <PatientLabs patient={patient} />
                  </Can>
                )}
                {showComp('4') && (
                  <Can I="ViewImages" an="Patient">
                    <PatientImages patient={patient} />
                  </Can>
                )}
                {showComp('5') && <History patient={patient} />}
                {showComp('6') && (
                  <Can I="ViewCourses" an="Patient">
                    <PatientCourses patient={patient} />
                  </Can>
                )}
                {showComp('7') && (
                  <Can I="ViewSessionsPulses" an="Patient">
                    <SessionsPulses summary={appointmentHistory} />
                  </Can>
                )}
                {showComp('8') && <Dental patient={patient} />}
                {showComp('9') && (
                  <PatientProgress
                    history={appointmentHistory}
                    viewFields={viewFields}
                  />
                )}
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
