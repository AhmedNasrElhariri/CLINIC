import { useMemo } from 'react';
import { Spinner } from 'components/widgets/button/spinner';
import { CRButton } from 'components';
import { useTranslation } from 'react-i18next';
import Sessions from './sessions';
import { useSessionDefinition, useDoctor } from 'hooks';

function AppointmentInvoice({
  handleFinishReferedDoctor,
  loading,
  selectedSessions,
  setSelectedSessions,
  appointment,
}) {
  const { t } = useTranslation();
  const { sessionsDefinition } = useSessionDefinition({});
  const { doctorSessionsDefinations } = useDoctor({
    doctorId: appointment?.doctor.id,
    referedDoctor: true,
  });
  const updatedSessionDefinitions = useMemo(() => {
    const upSess = sessionsDefinition.filter(sDefination =>
      doctorSessionsDefinations.some(
        sDoctor => sDoctor.sessionId === sDefination.id
      )
    );
    return upSess.map(s => {
      return {
        name: s.name,
        id: s,
      };
    });
  }, [sessionsDefinition, doctorSessionsDefinations]);
  return (
    <>
      <div className="flex mt-5 flex-col md:flex-row">
        <div className="sm:pr-5">
          <Sessions
            t={t}
            selectedSessions={selectedSessions}
            setSelectedSessions={setSelectedSessions}
            sessions={updatedSessionDefinitions}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-3 w-full md:w-1/2 mt-3">
        <CRButton onClick={handleFinishReferedDoctor}>
          {loading ? <Spinner /> : t('finish')}
        </CRButton>
      </div>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
