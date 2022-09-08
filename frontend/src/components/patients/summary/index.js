import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { Modal, Whisper, Tooltip, Form } from 'rsuite';
import { useParams, useHistory, Switch, Route } from 'react-router-dom';
import {
  Div,
  H6,
  CRNav,
  CRVDivider,
  H3,
  CRButton,
  CRNestedSelector,
} from 'components';
import { formatDate } from 'utils/date';
import SummaryTable from '../summary-table';
import { capitalize } from 'utils/text';
import { KeyStyled, ValueStyled } from './style';
import AppointmentGallery from 'components/appointments/pictures/gallery';
import { useModal, useAppointments } from 'hooks';
import { useTranslation } from 'react-i18next';
import DeleteImage from './delete-image';

const initalVal = {
  imageId: null,
};
const renderProp = (key, value, textValue) => {
  console.log(value, textValue, 'value, textValue');
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
const renderProp2 = (key, value) => {
  return (
    <Div display="flex" alignItems="center" minHeight={60}>
      <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
        <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
      </Whisper>
      {value.length > 0 &&
        value.map(v => (
          <Div display="flex">
            <CRVDivider vertical />
            <Div display="flex">
              <ValueStyled>{v[0]}</ValueStyled>
            </Div>
            <Div ml={10} display="flex" mr={10}>
              <ValueStyled>{v[1]}</ValueStyled>
            </Div>
          </Div>
        ))}
    </Div>
  );
};

const renderAppointment = data => {
  return data.map(({ value, field, textValue }, idx) => (
    <React.Fragment key={idx}>
      {value && field.type === 'NestedSelector'
        ? renderProp(
            field.name,
            <Form>
              {/* <CRNestedSelector
                value={value}
                choices={field.choices}
                disabled
              /> */}
            </Form>
          )
        : value && field.type === 'SelectorWithInput'
        ? renderProp2(field.name, value, textValue)
        : renderProp(field.name, value, textValue)}
    </React.Fragment>
  ));
};

const PatientSummary = ({ summary, tabularFields, tabularData, patientId }) => {
  const { t } = useTranslation();
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
  const [activeSession, setActiveSession] = useState(null);
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
  console.log(formValue, 'FF');
  if (!activeSession) {
    return '...No History';
  }
  console.log(updatedSummary, 'updatedSummary');
  return (
    <Div display="flex" position="relative">
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
      <Div m={4} flexGrow={1}>
        {updatedSummary.length ? (
          <>
            <H3 mb={4}>
              {t('session')} {updatedSummary.length - sessionId} {' / '}
              {activeSession.updater?.name}
            </H3>
            <Div>
              {renderProp('Date', formatDate(date))}
              {renderAppointment(data)}
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
      </Div>

      <Div position="absolute" top={0} right={3}>
        <Div mb={10}>
          <CRButton
            onClick={() => history.push(`/appointments/${activeSession.id}`)}
            variant="primary"
            mr={10}
            ml={10}
          >
            {t('edit')}
          </CRButton>
          <CRButton onClick={open} variant="primary">
            {t('tableView')}
          </CRButton>
        </Div>
        {header !== 'Delete Image' && (
          <Div>
            <Modal show={visible} full onHide={close}>
              <Modal.Body>
                <SummaryTable data={tabularData} fields={tabularFields} />
              </Modal.Body>
            </Modal>
          </Div>
        )}
      </Div>
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
