import React, { useState, useCallback, lazy } from 'react';
import styled from 'styled-components';
import { useParams, Switch, Route } from 'react-router-dom';
import { Can } from 'components/user/can';
import { PatientSummary, AllowedViews } from 'components';
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
import { useQueryParams, useHospitals, usePatients } from 'hooks';
import PatientInformationCreation from '../patient-information-creation';
import PatientCoupons from '../patient-coupons';
import PatientRevenue from '../patient-revenue';
import { useTranslation } from 'react-i18next';
import { SelectPicker } from 'rsuite';
import Header from './header';
import Aside from './aside';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TabContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const FaceOperationsPage = lazy(() => import('../face-operations'));

function Appointment() {
  const { t } = useTranslation();
  const tabs = [
    t('patientInfo'),
    t('sessions'),
    t('surgeries'),
    t('labs'),
    t('images'),
    t('history'),
    t('courses'),
    t('sessionsPulses'),
    t('dental'),
    t('faceOperation'),
    t('progress'),
    t('patientInformationCreation'),
    t('patientCoupons'),
    t('patientRevenue'),
  ];
  const tabularFields = [
    { id: 'name', name: t('name') },
    { id: 'address', name: t('address') },
  ];
  let { patientId } = useParams();
  let { appointmentId } = useQueryParams();
  const { onePatient: patient } = usePatients({ patientId });
  const { viewFields, appointmentHistory } = usePatientHistory({ patientId });
  const { hospitals } = useHospitals({});
  const [activeTab, setActiveTab] = useState('0');
  const showComp = useCallback(idx => activeTab === idx, [activeTab]);

  return (
    <>
      <Header
        patientName={patient.name}
        t={t}
        appointmentId={appointmentId}
        className="mb-7"
      />

      <SelectPicker
        className="w-64 mb-7 sm:!hidden"
        cleanable={false}
        defaultValue={activeTab}
        onSelect={setActiveTab}
        searchable={false}
        data={tabs.map((item, i) => ({ label: item, value: String(i) }))}
      />

      <Switch>
        <Route exact path="/patients/:id">
          {() => (
            <Container>
              <Aside
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              <TabContainer>
                {showComp('0') && (
                  <Can I="ViewPatientInfo" an="Patient">
                    <PatientInfo patient={patient} />
                  </Can>
                )}
                {showComp('1') && (
                  <Can I="ViewSessions" an="Patient">
                    <PatientSummary
                      summary={appointmentHistory}
                      tabularFields={tabularFields}
                      tabularData={hospitals}
                      patientId={patientId}
                    />
                  </Can>
                )}
                {showComp('2') && (
                  <Can I="ViewSurgeries" an="Patient">
                    <PatientSurgries
                      history={[]}
                      viewFields={viewFields}
                      patientId={patient?.id}
                    />
                  </Can>
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
                {showComp('5') && (
                  <Can I="ViewHistory" an="Patient">
                    <History patient={patient} />
                  </Can>
                )}
                {showComp('6') && (
                  <Can I="ViewCourses" an="Patient">
                    <PatientCourses patientId={patient?.id} />
                  </Can>
                )}
                {showComp('7') && (
                  <Can I="ViewSessionsPulses" an="Patient">
                    <SessionsPulses summary={appointmentHistory} />
                  </Can>
                )}
                <AllowedViews part="Dental">
                  {showComp('8') && (
                    <Can I="ViewDental" an="Patient">
                      <Dental patient={patient} />
                    </Can>
                  )}
                </AllowedViews>
                {showComp('9') && (
                  <Can I="ViewFaseOperation" an="Patient">
                    <FaceOperationsPage patient={patient} />
                  </Can>
                )}
                {showComp('10') && (
                  <Can I="ViewProgress" an="Patient">
                    <PatientProgress
                      history={appointmentHistory}
                      viewFields={viewFields}
                    />
                  </Can>
                )}
                {showComp('11') && (
                  <Can I="ViewPatientInformationCreation" an="Patient">
                    <PatientInformationCreation patient={patient} />
                  </Can>
                )}
                {showComp('12') && (
                  <Can I="ViewCoupons" an="Patient">
                    <PatientCoupons patient={patient} />
                  </Can>
                )}
                {showComp('13') && (
                  <Can I="ViewPatientRevenue" an="Patient">
                    <PatientRevenue patient={patient} />
                  </Can>
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
