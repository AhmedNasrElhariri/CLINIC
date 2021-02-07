import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as R from 'ramda';
import { FlexboxGrid, PanelGroup } from 'rsuite';
import { formatDate, getNameMonthDaysYears } from 'utils/date';
import AppointmentGallery from '../../appointments/images/gallery';

import { Div, CRVDivider, H3 } from 'components';
import { Modal, Whisper, Tooltip } from 'rsuite';
import { KeyStyled, ValueStyled } from '../summary/style';
import { capitalize } from 'utils/text';
import { TitleStyle, SlimText, BtnClick, SessionsPanel } from './style';

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

const renderAppointment = dat => {
  return dat.map(({ value, field }, idx) => (
    <React.Fragment key={idx}>
      {value && renderProp(field.name, value)}
    </React.Fragment>
  ));
};

const Sessions = ({ summary }) => {
  const [activeSession, setActiveSession] = useState(null);

  useEffect(() => {
    setActiveSession(R.propOr({}, '0')(summary));
  }, []);

  const date = useMemo(() => R.propOr(new Date(), 'date')(activeSession), [
    activeSession,
  ]);

  const data = useMemo(() => R.propOr([], 'data')(activeSession), [
    activeSession,
  ]);

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
    <>
      <PanelGroup accordion bordered shaded>
        {summary.map((session, index) => (
          <SessionsPanel
            header={
              <FlexboxGrid.Item colspan={24}>
                <TitleStyle>Session {index + 1}</TitleStyle>
                <SlimText>
                  <div>{getNameMonthDaysYears(session.date)}</div>
                </SlimText>
                <BtnClick>See Details</BtnClick>
              </FlexboxGrid.Item>
            }
          >
            <FlexboxGrid.Item colspan={24}>
              <H3 mb={4}>Session {index + 1}</H3>
              <Div>
                {renderProp('Date', formatDate(session.date))}
                {renderAppointment(data)}
                {activeSession.notes &&
                  renderProp('Notes', activeSession.notes)}
                {images.length > 0 &&
                  renderProp('Images', <AppointmentGallery images={images} />)}
              </Div>
            </FlexboxGrid.Item>
          </SessionsPanel>
        ))}
      </PanelGroup>
    </>
  );
};
Sessions.defaultProps = {
  summary: [],
  fields: [],
};

export default Sessions;
