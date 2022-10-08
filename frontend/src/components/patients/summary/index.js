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
  return (
    <>
      <H3>{name}</H3>
      <Div display="flex">
        {Object.keys(fields).map((key, i) => (
          <StyledContainer>
            <StyledHeader>{key}</StyledHeader>
            {fields[key] && <StyledCell>{fields[key]}</StyledCell>}
          </StyledContainer>
        ))}
      </Div>
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

// const renderProp2 = (key, value) => {
//   return (
//     <Div display="flex" alignItems="center" minHeight={60}>
//       <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
//         <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
//       </Whisper>
//       {value.length > 0 &&
//         value.map(v => (
//           <Div display="flex">
//             <CRVDivider vertical />
//             <Div display="flex">
//               <ValueStyled>{v[0]}</ValueStyled>
//             </Div>
//             <Div ml={10} display="flex" mr={10}>
//               <ValueStyled>{v[1]}</ValueStyled>
//             </Div>
//           </Div>
//         ))}
//     </Div>
//   );
// };

const renderAppointment = data => {
  // return data.map(({ value, field, textValue }, idx) => (
  //   <React.Fragment key={idx}>
  //     {value && field.type === 'NestedSelector'
  //       ? renderProp(
  //           field.name,
  //           <Form>
  //             {/* <CRNestedSelector
  //               value={value}
  //               choices={field.choices}
  //               disabled
  //             /> */}
  //           </Form>
  //         )
  //       : value && field.type === 'SelectorWithInput'
  //       ? renderProp2(field.name, value, textValue)
  //       : renderProp(field.name, value, textValue)}
  //   </React.Fragment>
  // ));
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
        <div
          className="flex gap-3 items-center md:!hidden sm:pl-4"
          onChange={event =>
            setActiveSession(
              updatedSummary.find(session => session.id === event.target.value)
            )
          }
        >
          <label>Session:</label>
          <select className="grow p-1" defaultValue={activeSession.id}>
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

      <Div m={4} flexGrow={1}>
        {updatedSummary.length ? (
          <>
            <div className="flex flex-row flex-wrap items-center justify-between">
              <H3>
                {t('session')} {updatedSummary.length - sessionId} {' / '}
                {activeSession.updater?.name}
              </H3>
              <Div className="my-3">
                <Div>
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
                </Div>
                {header !== 'Delete Image' && (
                  <Div>
                    <Modal show={visible} full onHide={close}>
                      <Modal.Body>
                        <SummaryTable
                          data={tabularData}
                          fields={tabularFields}
                        />
                      </Modal.Body>
                    </Modal>
                  </Div>
                )}
              </Div>
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
