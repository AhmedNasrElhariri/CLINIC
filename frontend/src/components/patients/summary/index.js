import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Modal } from 'rsuite';

import { Div, H6, CRNav, CRVDivider, H3, CRButton } from 'components';
import { formatDate } from 'utils/date';
import { useModal } from 'components/widgets/modal';
import SummaryTable from '../summary-table';
import { capitalize } from 'utils/text';

const renderProp = (key, value) => {
  return (
    <Div display="flex" alignItems="center" height={60}>
      <H6 width="250px" color="texts.2">
        {capitalize(key)}
      </H6>
      <CRVDivider vertical height="40%" />
      <H6 fontWeight="bold">{value}</H6>
    </Div>
  );
};

const renderAppointment = data => {
  return data.map(({ value, field }, idx) => (
    <React.Fragment key={idx}>{renderProp(field.name, value)}</React.Fragment>
  ));
};

const PatientSummary = ({ summary, tabularFields, tabularData }) => {
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    setActiveSession(R.propOr({}, '0')(summary));
  }, [summary]);

  const date = useMemo(() => R.propOr(new Date(), 'date')(activeSession), [
    activeSession,
  ]);

  const data = useMemo(() => R.propOr([], 'data')(activeSession), [
    activeSession,
  ]);

  const sessionId = useMemo(
    () => R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(summary),
    [activeSession, summary]
  );

  const { visible, open, close } = useModal();

  if (!activeSession) {
    return '...No History';
  }

  return (
    <Div display="flex" position="relative">
      <CRNav vertical width={300} onSelect={setActiveSession}>
        {summary.map((session, idx) => (
          <CRNav.CRVItem
            key={session.id}
            eventKey={session}
            active={activeSession.id === session.id}
          >
            Session {idx + 1}
          </CRNav.CRVItem>
        ))}
      </CRNav>
      <Div m={4} flexGrow={1}>
        {summary.length ? (
          <>
            <H3 mb={4}>Session {sessionId + 1}</H3>
            <Div>
              {renderProp('Date', formatDate(date))}
              {renderAppointment(data)}
            </Div>
          </>
        ) : (
          <Div
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <H6 color="texts.2">No Summary</H6>
          </Div>
        )}
      </Div>
      <Div position="absolute" top={0} right={3}>
        <CRButton onClick={open} primary small>
          Table View
        </CRButton>
        <Modal show={visible} full onHide={close}>
          <Modal.Body>
            <SummaryTable data={tabularData} fields={tabularFields} />
          </Modal.Body>
        </Modal>
      </Div>
    </Div>
  );
};

PatientSummary.defaultProps = {
  summary: [],
  fields: [],
};

export default PatientSummary;
