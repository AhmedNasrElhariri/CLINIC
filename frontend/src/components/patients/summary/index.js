import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Modal, Whisper, Tooltip } from 'rsuite';

import { Div, H6, CRNav, CRVDivider, H3, CRButton } from 'components';
import { formatDate } from 'utils/date';
import { useModal } from 'components/widgets/modal';
import SummaryTable from '../summary-table';
import { capitalize } from 'utils/text';
import { KeyStyled, ValueStyled } from './style';
import AppointmentGallery from '../../appointments/images/gallery';

const renderProp = (key, value) => {
  return (
    <Div display="flex" alignItems="center" minHeight={60}>
      <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
        <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
      </Whisper>
      <CRVDivider vertical />
      <ValueStyled>{value}</ValueStyled>
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

  const images = useMemo(() => {
    return R.pipe(
      R.propOr([], 'collections'),
      R.map(c =>
        c.images.map(i => ({ ...i, caption: c.caption, original: i.url }))
      ),
      R.flatten
    )(activeSession);
  }, [activeSession]);

  if (!activeSession) {
    return '...No History';
  }

  return (
    <Div display="flex" position="relative">
      <CRNav vertical minWidth={180} onSelect={setActiveSession}>
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
              {renderProp('Notes', activeSession.notes)}
              {renderProp('Images', <AppointmentGallery images={images} />)}
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
