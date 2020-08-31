import React, { useContext, useRef } from 'react';
import * as R from 'ramda';
import {
  MonthEventStyled,
  Time,
  Name,
  IconStyled,
  WeekWrapper,
  MonthWrapper,
  WeekEventStyled,
  DayEventStyled,
  DayWrapper,
  PopoverStyled,
  PatientName,
  ActionIconStyled,
  CloseIconStyled,
} from './style';

import Toolbar from './toolbar';
import CalendarContext from './context';
import { Div, AdjustAppointment } from 'components';
import { formatDate } from 'utils/date';
import { Whisper } from 'rsuite';

const EventDetails = ({ patient, name, start, end, onClose, ...props }) => {
  const { onCancel, onAdjust } = useContext(CalendarContext);
  return (
    <Div>
      <Div textAlign="right">
        <CloseIconStyled onClick={onClose} />
      </Div>
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <PatientName>{R.prop('name')(patient)}</PatientName>
        <AdjustAppointment
          appointment={{ patient, ...props }}
          onCancel={onCancel}
          onAdjust={onAdjust}
        >
          {({ onEdit, onCancel }) => (
            <>
              <ActionIconStyled icon="edit" onClick={onEdit} />
              <ActionIconStyled icon="trash-o" onClick={onCancel} />
            </>
          )}
        </AdjustAppointment>
      </Div>
      <Div fontSize={14}>{name}</Div>
      <Div fontSize={14} fontWeight={600}>
        {formatDate(start, 'HH:mm A')}
        {' - '}
        {formatDate(end, 'HH:mm A')}
      </Div>
    </Div>
  );
};
const ref = React.createRef();

export default {
  toolbar: Toolbar,
  month: {
    eventWrapper: props => <MonthWrapper {...props} />,
    event: ({ event }) => {
      return (
        <Whisper
          placement="bottomEnd"
          trigger="none"
          triggerRef={ref}
          speaker={
            <PopoverStyled {...event}>
              <EventDetails {...event} onClose={() => ref.current.close()} />
            </PopoverStyled>
          }
        >
          <MonthEventStyled {...event} onClick={() => ref.current.open()}>
            <Div>
              <Time>{formatDate(event.start, 'HH:mm a ')}</Time>
              <Name>{event.name}</Name>
            </Div>
          </MonthEventStyled>
        </Whisper>
      );
    },
  },
  week: {
    eventWrapper: ({ children, event }) => (
      <WeekWrapper {...event}>{children}</WeekWrapper>
    ),
    event: ({ event }) => (
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={
          <PopoverStyled {...event}>
            <EventDetails {...event} />
          </PopoverStyled>
        }
      >
        <WeekEventStyled {...event}>
          <Div height="100%" display="flex" alignItems="center">
            <Div flexGrow={1} display="flex">
              <Div flexGrow={1}>
                <Time>{formatDate(event.start, 'HH:mm A')}</Time>
                <Div>
                  <Name>{event.name}</Name>
                </Div>
              </Div>
              <IconStyled icon="calendar" mr={2} />
            </Div>
          </Div>
        </WeekEventStyled>
      </Whisper>
    ),
  },
  day: {
    eventWrapper: ({ children, ...props }) => (
      <DayWrapper {...props}>{children}</DayWrapper>
    ),
    event: ({ event: { name, start } }) => (
      <DayEventStyled>
        <Div height="100%" display="flex" alignItems="center">
          <Div flexGrow={1} display="flex" width="100%" alignItems="center">
            <IconStyled icon="calendar" mr={1} />
            <Time>{formatDate(start, 'HH:mm A')}</Time>
            <Div ml={2}>
              <Name>{name}</Name>
            </Div>
          </Div>
        </Div>
      </DayEventStyled>
    ),
  },
};
