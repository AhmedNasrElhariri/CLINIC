import { useCallback, useMemo, useState, useEffect } from 'react';
import { Div, CRNav, H6, CRVDivider } from 'components';
// import { useSuergriesAppointments } from 'hooks';
import ListSurgeries from './list-surgeries';
import SessionSelector from 'components/patients/surgery-summary/session-selector';
import Header from 'components/patients/surgery-summary/header';
import { Whisper, Tooltip, Divider } from 'rsuite';
import {
  KeyStyled,
  ValueStyled,
} from 'components/patients/surgery-summary/style';
import { capitalize } from 'utils/text';
import moment from 'moment';
import * as R from 'ramda';
import { formatDate } from 'utils/date';

const renderProp = (key, value, textValue) => {
  return (
    <Div display="flex" alignItems="center" minHeight={60}>
      <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
        <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
      </Whisper>
      <CRVDivider vertical />
      {Array.isArray(value) ? (
        value.map(v => (
          <>
            <ValueStyled>{v}</ValueStyled>
            <CRVDivider vertical />
          </>
        ))
      ) : (
        <ValueStyled>{value}</ValueStyled>
      )}

      {textValue && (
        <>
          <CRVDivider vertical />
          <ValueStyled>{textValue}</ValueStyled>
        </>
      )}
    </Div>
  );
};

const PatientSurgries = ({ history: summary, t }) => {
  // const { surgeries } = useSuergriesAppointments({
  //   patientId,
  // });

  const [activeSession, setActiveSession] = useState(null);

  const updatedSummary = useMemo(() => {
    const today = moment(new Date()).endOf('day');
    const ss = summary.filter(s => moment(s.date) <= today);
    return ss;
  }, [summary]);

  useEffect(() => {
    setActiveSession(R.propOr({}, '0')(updatedSummary));
  }, [updatedSummary]);

  const date = useMemo(
    () => R.propOr(new Date(), 'date')(activeSession),
    [activeSession]
  );

  const data = useMemo(
    () => R.propOr([], 'data')(activeSession),
    [activeSession]
  );
  if (!activeSession) {
    return '...No History';
  }
  // const handleClickSurgery = useCallback(data => {
  //   window.open(`/appointments/${data.id}`);
  // }, []);

  return (
    // <Div>
    //   <Div px={5} py={2}>
    //     <ListSurgeries data={history} onClick={handleClickSurgery} />
    //   </Div>
    //   <Div position="absolute" top={0} right={3}></Div>
    // </Div>
    <Div className="flex flex-col xl:flex-row">
      <Divider className="!mt-0 sm:!hidden" />

      {updatedSummary && activeSession && (
        <SessionSelector
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          updatedSummary={updatedSummary}
          t={t}
        />
      )}

      {/* Show default sessions list if screen is not small */}
      <div className="tw-hidden xl:inline-flex">
        <CRNav vertical minWidth={180} onSelect={setActiveSession}>
          {updatedSummary.map((session, idx) => (
            <CRNav.CRVItem
              key={session.id}
              eventKey={session}
              active={activeSession.id === session.id}
            >
              {t('surgery')} {updatedSummary.length - idx}
            </CRNav.CRVItem>
          ))}
        </CRNav>
      </div>

      <div className="sm:px-5 grow overflow-x-auto">
        {updatedSummary && updatedSummary.length > 0 ? (
          <>
            <Header
              updatedSummary={updatedSummary}
              t={t}
              activeSession={activeSession}
              // open={open}
            />
            {/* {header !== 'Delete Image' && (
              <Modal show={visible} onHide={close} className="!max-w-[90%]">
                <Modal.Body>
                  <SummaryTable data={tabularData} fields={tabularFields} />
                </Modal.Body>
              </Modal>
            )} */}

            {renderProp('Date', formatDate(date))}
            {/* <div className="overflow-x-auto">
              {renderAppointment(newGroups)}
            </div> */}

            {activeSession.notes && renderProp('Notes', activeSession.notes)}
            {/* {pictures.length > 0 &&
              renderProp(
                'Images',
                <AppointmentGallery
                  pictures={pictures}
                  onDelete={handleDeleteImage}
                />
              )} */}
          </>
        ) : (
          <Div
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
          >
            <H6 color="texts.2">{t('noData')}</H6>
          </Div>
        )}
      </div>
      {/* {header === 'Delete Image' && (
        <DeleteImage
          visible={visible}
          formValue={formValue}
          onOk={handleAdd}
          onClose={close}
          header={header}
        />
      )} */}
    </Div>
  );
};

PatientSurgries.defaultProps = {
  surgries: [],
};

export default PatientSurgries;
