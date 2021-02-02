import React, { useState, useEffect, useMemo,useCallback } from 'react';
import * as R from 'ramda';
import { List, FlexboxGrid, Icon } from "rsuite";
import { formatDate,getNameMonthDaysYears } from 'utils/date';
import AppointmentGallery from '../../appointments/images/gallery';

import { Div, H6, CRNav, CRVDivider, H3, CRButton } from 'components';
import { Modal, Whisper, Tooltip } from 'rsuite';
import { KeyStyled, ValueStyled } from '../summary/style';
import { capitalize } from 'utils/text';
import { Button } from 'react-scroll';

const styleList = {
  width: "100%",
};
const styleCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
};
const styleLink = {
    fontSize: '22px',
    color:'#51c6f3',
    background:'transparent'
}

const slimText = {
  fontSize: "1em",
  color: "#97969B",
  fontWeight: "lighter",
  paddingBottom: 5,
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: "nowrap",
  fontWeight: 500,
  fontSize:'25px'
};

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

const Sessions = ({summary}) => {
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
  
    const sessionId = useMemo(
      () => R.findIndex(R.propEq('id', R.prop('id')(activeSession)))(summary),
      [activeSession, summary]
    );
    
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
const handleSession= (idx)=> {
 if(activeSession.id === idx){
   console.log('yes')
 }else{
   //setActiveSession({activeSession:idx})
 }
};
  
   

  return (
    <List hover style={styleList} bordered>
      {summary.map((session, index) => (
        <List.Item key={session.id} index={index}>
          <FlexboxGrid justify="space-between">
            {/*base info*/}
            <FlexboxGrid.Item
              colspan={6}
              style={{
                ...styleCenter,
                flexDirection: "column",
                alignItems: "flex-start",
                overflow: "hidden",
              }}
            >
              <div style={titleStyle}>Session {index + 1}</div>
              <div style={slimText}>
                <div>{getNameMonthDaysYears(session.date)}</div>
              </div>
            </FlexboxGrid.Item>

            {/*uv data*/}
            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter,
              }}
            >
              <button style={styleLink} onClick={handleSession(session.id)}>see Details</button>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={24}
            
            >
               
                <H3 mb={4}>Session {index + 1}</H3>
                <Div>
                  {renderProp('Date', formatDate(session.date))}
                  {renderAppointment(data)}
                  {activeSession.notes && renderProp('Notes', activeSession.notes)}
                  {images.length > 0 &&
                    renderProp('Images', <AppointmentGallery images={images} />)}
                </Div>
              
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
};
Sessions.defaultProps = {
  summary: [],
  fields: [],
};

export default Sessions;
