import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { Modal, Whisper, Tooltip, Divider } from 'rsuite';
import { useHistory } from 'react-router-dom';
import { Div, H6, CRNav, CRVDivider, H3, CRButton } from 'components';
import { formatDate } from 'utils/date';
import SummaryTable from '../summary-table';
import { capitalize } from 'utils/text';
import {
  KeyStyled,
  ValueStyled,
  StyledCell,
  StyledContainer,
  StyledHeader,
} from './style';
import AppointmentGallery from 'components/appointments/pictures/gallery';
import { useModal, useAppointments } from 'hooks';
import { useTranslation } from 'react-i18next';
import DeleteImage from './delete-image';
import useGlobalState from 'state';
import { normalizeDataWithGroups } from 'services/appointment';

const initalVal = {
  imageId: null,
};

const renderTable = (fields, name) => {
  return (
    <>
      <H3>{name}</H3>
      <Div display="flex">
        {Object.keys(fields).map((key, i) => (
          <StyledContainer>
            <StyledHeader>{key}</StyledHeader>
            {fields[key] &&
              fields[key].length > 0 &&
              fields[key].map(v => <StyledCell>{v}</StyledCell>)}
          </StyledContainer>
        ))}
      </Div>
    </>
  );
};
const renderValues = (fields, name) => {
  console.log(fields);
  return (
    <>
      <H3>{name}</H3>
      <div className="flex flex-nowrap overflow-x-auto pb-7">
        {Object.keys(fields).map((key, i) => (
          <>
            <div className="min-w-[7rem] flex-1 text-center inline-flex flex-col">
              <h6 className="mb-2">{key}</h6>
              {fields[key] &&
                fields[key].map((item, idx) => <p key={idx}>{item}</p>)}
            </div>
          </>
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

  const history = useHistory();
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
  const sessionId = useMemo(
    () =>
      R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(updatedSummary),
    [activeSession, updatedSummary]
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
    <Div className="flex flex-col md:flex-row">
      <Divider className="!mt-0 sm:!hidden" />

      {/* Show responsive session toggler if screen is small and there is list and active session  */}
      {updatedSummary && activeSession && (
        <div className="flex gap-3 items-center md:!hidden sm:pl-4">
          <label>Session:</label>
          <select
            className="grow p-1"
            defaultValue={activeSession.id}
            onChange={event =>
              setActiveSession(
                updatedSummary.find(
                  session => session.id === event.target.value
                )
              )
            }
          >
            {updatedSummary.map((session, i) => (
              <option key={i} value={session.id}>{`${t('session')} ${
                updatedSummary.length - i
              }`}</option>
            ))}
          </select>
        </div>
      )}

      {/* Show default sessions list if screen is not small */}
      <div className="tw-hidden md:inline-flex">
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

      <div className="sm:px-5">
        {updatedSummary.length ? (
          <>
            <div className="flex flex-row flex-wrap items-center justify-between">
              <H3>
                {t('session')} {updatedSummary.length - sessionId} {' / '}
                {activeSession.updater?.name}
              </H3>
              <div className="my-3">
                <div>
                  <CRButton
                    onClick={() =>
                      history.push(`/appointments/${activeSession.id}`)
                    }
                    variant="primary"
                    mr={10}
                    ml={10}
                  >
                    {t('edit')}
                  </CRButton>
                  <CRButton onClick={open} variant="primary">
                    {t('tableView')}
                  </CRButton>
                </div>
                {header !== 'Delete Image' && (
                  <div>
                    <Modal
                      show={visible}
                      onHide={close}
                      className="!max-w-[90%]"
                    >
                      <Modal.Body>
                        <SummaryTable
                          data={tabularData}
                          fields={tabularFields}
                        />
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </div>
            </div>

            <Div>
              {renderProp('Date', formatDate(date))}
              {renderAppointment(newGroups)}
              {activeSession.notes && renderProp('Notes', activeSession.notes)}
              {pictures.length > 0 &&
                renderProp(
                  'Images',
                  <AppointmentGallery
                    pictures={pictures}
                    onDelete={handleDeleteImage}
                  />
                )}
            </Div>
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
