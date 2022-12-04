import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { Modal, Whisper, Tooltip, Divider } from 'rsuite';
import { Div, H6, CRNav, CRVDivider, H3 } from 'components';
import { formatDate } from 'utils/date';
import SummaryTable from '../summary-table';
import { capitalize } from 'utils/text';
import { KeyStyled, ValueStyled, StyledCell } from './style';
import AppointmentGallery from 'components/appointments/pictures/gallery';
import { useModal, useAppointments } from 'hooks';
import { useTranslation } from 'react-i18next';
import DeleteImage from './delete-image';
import useGlobalState from 'state';
import { normalizeDataWithGroups } from 'services/appointment';
import SessionSelector from './session-selector';
import Header from './header';
import { formatNumber, isFloat } from 'utils/nubmer';

const initalVal = {
  imageId: null,
};

const renderFieldValue = value => {
  if (isFloat(value)) {
    return formatNumber(value);
  }
  return value;
};

const renderTable = (fields, name) => {
  const keys = Object.keys(fields);
  return (
    <>
      <H3>{name}</H3>
      <div
        className="pb-10 grid"
        style={{
          gridTemplateColumns: `repeat(${keys.length}, minmax(100px, 1fr))`,
        }}
      >
        {keys.map(key => (
          <div className="text-center" key={key}>
            <h6 className="mb-2">{key}</h6>
            {fields[key] &&
              fields[key].length > 0 &&
              fields[key].map(v => (
                <StyledCell>{renderFieldValue(v)}</StyledCell>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};
const renderValues = (fields, name) => {
  const keys = Object.keys(fields);
  return (
    <>
      <H3>{name}</H3>
      <div
        className="pb-10 grid"
        style={{
          gridTemplateColumns: `repeat(${keys.length}, minmax(100px, 1fr))`,
        }}
      >
        {keys.map(key => (
          <div className="text-center" key={key}>
            <h6 className="mb-2">{key}</h6>
            {fields[key] &&
              fields[key].length > 0 &&
              fields[key].map(v => (
                <StyledCell>{renderFieldValue(v)}</StyledCell>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};
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

const renderAppointment = data => {
  return data.map(({ status, fields, name }, idx) =>
    status === 'Dynamic'
      ? renderTable(fields, name)
      : renderValues(fields, name)
  );
};

const PatientSummary = ({ summary, tabularFields, tabularData, patientId }) => {
  const { t } = useTranslation();
  const [activeSession, setActiveSession] = useState(null);
  const [views] = useGlobalState('activeViews');
  const view = useMemo(
    () => views[activeSession?.type],
    [activeSession, views]
  );
  const groups = useMemo(() => R.propOr([], 'fieldGroups')(view), [view]);
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initalVal);
  const [header, setHeader] = useState('');
  const { deleteAppointmentPhoto } = useAppointments({
    onDeletePhoto: close,
    patientId: patientId,
  });
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

  const newGroups = normalizeDataWithGroups(groups, data);

  const handleDeleteImage = useCallback(
    data => {
      const image = R.pick(['id'])(data);
      setHeader('Delete Image');
      setFormValue({ ...formValue, imageId: image.id });
      open();
    },
    [open, setFormValue, setHeader, formValue]
  );
  const handleAdd = useCallback(() => {
    deleteAppointmentPhoto({
      variables: {
        id: formValue.imageId,
      },
    });
  }, [deleteAppointmentPhoto, formValue]);
  const pictures = useMemo(
    () => R.propOr([], 'pictures')(activeSession),
    [activeSession]
  );
  if (!activeSession) {
    return '...No History';
  }

  return (
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
              {t('session')} {updatedSummary.length - idx}
            </CRNav.CRVItem>
          ))}
        </CRNav>
      </div>

      <div className="sm:px-5 grow overflow-x-auto">
        {updatedSummary.length ? (
          <>
            <Header
              updatedSummary={updatedSummary}
              t={t}
              activeSession={activeSession}
              open={open}
            />
            {header !== 'Delete Image' && (
              <Modal show={visible} onHide={close} className="!max-w-[90%]">
                <Modal.Body>
                  <SummaryTable data={tabularData} fields={tabularFields} />
                </Modal.Body>
              </Modal>
            )}

            {renderProp('Date', formatDate(date))}
            <div className="overflow-x-auto">
              {renderAppointment(newGroups)}
            </div>

            {activeSession.notes && renderProp('Notes', activeSession.notes)}
            {pictures.length > 0 &&
              renderProp(
                'Images',
                <AppointmentGallery
                  pictures={pictures}
                  onDelete={handleDeleteImage}
                />
              )}
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
      {header === 'Delete Image' && (
        <DeleteImage
          visible={visible}
          formValue={formValue}
          onOk={handleAdd}
          onClose={close}
          header={header}
        />
      )}
    </Div>
  );
};

PatientSummary.defaultProps = {
  summary: [],
  fields: [],
};

export default PatientSummary;
