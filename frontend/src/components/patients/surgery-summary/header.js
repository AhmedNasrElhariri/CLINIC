import { useMemo } from 'react';
import { H3, CRButton } from 'components';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';

export default function Header({ updatedSummary, t, activeSession }) {
  const history = useHistory();

  const sessionId = useMemo(
    () =>
      R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(updatedSummary),
    [activeSession, updatedSummary]
  );
  const patientSurgeries = R.propOr({}, 'patientSurgeries')(activeSession);
  return (
    <div className="flex flex-row flex-wrap items-center justify-between">
      <H3>
        {t('surgery')} {updatedSummary?.length - sessionId} {' / '}
        {patientSurgeries[0]?.surgery.name}
        {' / '}
        {patientSurgeries[0]?.hospital.name}
      </H3>
      <div className="my-3">
        <div>
          <CRButton
            onClick={() => history.push(`/appointments/${activeSession.id}`)}
            variant="primary"
            mr={10}
            ml={10}
          >
            {t('edit')}
          </CRButton>
          {/* <CRButton onClick={open} variant="primary">
            {t('tableView')}
          </CRButton> */}
        </div>
      </div>
    </div>
  );
}
