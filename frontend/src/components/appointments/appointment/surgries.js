import { useMemo, useState, useEffect, useCallback } from 'react';
import { Div, CRNav, H6, CRVDivider } from 'components';
import SessionSelector from 'components/patients/surgery-summary/session-selector';
import Header from 'components/patients/surgery-summary/header';
import { Whisper, Tooltip, Divider } from 'rsuite';
import {
  KeyStyled,
  ValueStyled,
  StyledCell,
} from 'components/patients/surgery-summary/style';
import { capitalize } from 'utils/text';
import moment from 'moment';
import * as R from 'ramda';
import { formatDate } from 'utils/date';
import useGlobalState from 'state';
import { normalizeDataWithGroups } from 'services/appointment';
import { H3 } from 'components';
import { formatNumber, isFloat } from 'utils/nubmer';
import AppointmentGallery from 'components/appointments/pictures/gallery';
import { useModal, useAppointments } from 'hooks';
import DeleteImage from 'components/patients/summary/delete-image';

const initalVal = {
  imageId: null,
};

const renderFieldValue = value => {
  if (isFloat(value)) {
    return formatNumber(value);
  }
  return value;
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
        {(keys || []).map(key => (
          <>
            <div className="text-center" key={key}>
              <h6 className="mb-2">{key}</h6>
              {fields[key] && (
                <StyledCell>{renderFieldValue(fields[key])}</StyledCell>
              )}
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
    renderValues(fields, name)
  );
};

const PatientSurgries = ({ history: summary, t, patientId }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [views] = useGlobalState('activeViews');
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initalVal);
  const [header, setHeader] = useState('');
  const { deleteAppointmentPhoto } = useAppointments({
    onDeletePhoto: close,
    patientId: patientId,
    type: 'Surgery',
  });
  const view = useMemo(
    () => views[activeSession?.type],
    [activeSession, views]
  );
  const groups = useMemo(() => R.propOr([], 'fieldGroups')(view), [view]);

  // const updatedSummary = useMemo(() => {
  //   const today = moment(new Date()).endOf('day');
  //   const ss = summary.filter(s => moment(s.date) <= today);
  //   return ss;
  // }, [summary]);

  useEffect(() => {
    setActiveSession(R.propOr({}, '0')(summary));
  }, [summary]);

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

      {summary && activeSession && (
        <SessionSelector
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          updatedSummary={summary}
          t={t}
        />
      )}

      {/* Show default sessions list if screen is not small */}
      <div className="tw-hidden xl:inline-flex">
        <CRNav vertical minWidth={180} onSelect={setActiveSession}>
          {summary.map((session, idx) => (
            <CRNav.CRVItem
              key={session.id}
              eventKey={session}
              active={activeSession.id === session.id}
            >
              {t('surgery')} {summary.length - idx}
            </CRNav.CRVItem>
          ))}
        </CRNav>
      </div>

      <div className="sm:px-5 grow overflow-x-auto">
        {summary && summary.length > 0 ? (
          <>
            <Header
              updatedSummary={summary}
              t={t}
              activeSession={activeSession}
            />

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

PatientSurgries.defaultProps = {
  surgries: [],
};

export default PatientSurgries;
