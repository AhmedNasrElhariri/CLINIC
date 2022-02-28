import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
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
import { useModal } from 'hooks';

const renderProp = (key, value, textValue) => {
  return (
    <Div display="flex" alignItems="center" minHeight={60}>
      <Whisper speaker={<Tooltip>{key}</Tooltip>} delayHide={0} delayShow={0}>
        <KeyStyled color="texts.2">{capitalize(key)}</KeyStyled>
      </Whisper>
      <CRVDivider vertical />
      <ValueStyled>{value}</ValueStyled>
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
              <CRNestedSelector
                value={value}
                choices={field.choices}
                disabled
              />
            </Form>
          )
        : value && field.type === 'SelectorWithInput'
        ? renderProp2(field.name, value, textValue)
        : renderProp(field.name, value, textValue)}
    </React.Fragment>
  ));
};

const PatientSummary = ({ summary, tabularFields, tabularData }) => {
  const [activeSession, setActiveSession] = useState(null);
  const history = useHistory();
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
  const sessionId = useMemo(
    () => R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(summary),
    [activeSession, summary]
  );
  // const updatedData = useMemo(() => {
  //   let newData = [];
  //   if (dynamicTextInput) {
  //     newData = data.map(d => {
  //       let value = '';
  //       value = dynamicTextInput[d.field.id] || '';
  //       return { ...d, textValue: value };
  //     });
  //   } else {
  //     newData = data;
  //   }
  //   return newData;
  // }, [data, dynamicTextInput]);
  const { visible, open, close } = useModal();
  const pictures = useMemo(
    () => R.propOr([], 'pictures')(activeSession),
    [activeSession]
  );

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
            Session {summary.length - idx}
          </CRNav.CRVItem>
        ))}
      </CRNav>
      <Div m={4} flexGrow={1}>
        {summary.length ? (
          <>
            <H3 mb={4}>Session {summary.length - sessionId}</H3>
            <Div>
              {renderProp('Date', formatDate(date))}
              {renderAppointment(data)}
              {activeSession.notes && renderProp('Notes', activeSession.notes)}
              {pictures.length > 0 &&
                renderProp(
                  'Images',
                  <AppointmentGallery pictures={pictures} />
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
            <H6 color="texts.2">No Summary</H6>
          </Div>
        )}
      </Div>

      <Div position="absolute" top={0} right={3}>
        <CRButton
          onClick={() => history.push(`/appointments/${activeSession.id}`)}
          variant="primary"
          mr={10}
        >
          Edit
        </CRButton>
        <CRButton onClick={open} variant="primary">
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
