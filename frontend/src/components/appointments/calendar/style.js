import styled from 'styled-components';

import { Calendar } from 'react-big-calendar';
import { Icon, Popover } from 'rsuite';
import { variant, space } from 'styled-system';
import { createGlobalStyle } from 'styled-components';
import { CRButtonGroup } from 'components';

const variants = props =>
  variant({
    variants: {
      one: {
        color: props.theme.colors.events[0].color,
        border: `1px solid ${props.theme.colors.events[0].color}`,
        background: props.theme.colors.events[0].bg,
      },
      two: {
        color: props.theme.colors.events[1].color,
        border: `1px solid ${props.theme.colors.events[1].color}`,
        background: props.theme.colors.events[1].bg,
      },
      three: {
        color: props.theme.colors.events[2].color,
        border: `1px solid ${props.theme.colors.events[2].color}`,
        background: props.theme.colors.events[2].bg,
      },
      four: {
        color: props.theme.colors.events[3].color,
        border: `1px solid ${props.theme.colors.events[3].color}`,
        background: props.theme.colors.events[3].bg,
      },
      five: {
        color: props.theme.colors.events[4].color,
        border: `1px solid ${props.theme.colors.events[4].color}`,
        background: props.theme.colors.events[4].bg,
      },
    },
  });

export const MonthEventStyled = styled.div`
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  border-radius: 8px;
  padding: 0px 5px;
  font-size: 13px;

  ${variants}
`;

export const Time = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const Name = styled.span``;

export const IconStyled = styled(Icon)`
  ${space}
`;

export const CalendarStyled = styled(Calendar)`
  & .rbc-date-cell {
    font-weight: bold;
    color: ${props => props.theme.colors.texts[1]};
    margin-top: 12px;
  }

  & .rbc-current a {
    background-color: ${props => props.theme.colors.primary};
    color: #ffffff;
    border-radius: 50%;
    padding: 10px;
  }

  & .rbc-show-more {
    text-align: right;
    padding-right: 5px;
    color: #283148;
  }

  ${createGlobalStyle`
      .rbc-overlay{
        width: 225px !important;
        max-width: 225px !important;
        min-width: 225px !important;
        padding: 20px;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 22px;
        border: none;

        & .rbc-event-content{
          margin-bottom: 5px;
        }
      }
      .rbc-overlay-header{
        font-size: 16px;
        color: ${props => props.theme.colors.texts[1]};
        border: none;
        display: flex;
        justify-content: center;
        padding: 15px 0;
      }
  `}
`;

export const MonthWrapper = styled.div`
  & .rbc-event {
    background: transparent !important;
    padding: 1px;
    margin-bottom: 2px;
    &:focus,
    &:visited {
      outline: none;
    }
  }
`;

export const WeekWrapper = styled.div`
  & .rbc-event {
    background: transparent !important;
    ${variants}
    &:focus,
    &:visited {
      outline: none;
    }
  }

  & .rbc-event-label {
    display: none;
  }
`;

export const WeekEventStyled = styled.div`
  height: 100%;
  ${variants}
  border: none;
`;

export const DayWrapper = styled.div`
  & .rbc-event {
    background: transparent !important;
    border-radius: 8px;
    max-width: 200px;
    ${variants}
    &:focus,
    &:visited {
      outline: none;
    }
  }

  & .rbc-event-label {
    display: none;
  }
`;

export const DayEventStyled = styled.div`
  height: 100%;
  ${variants}
`;

export const TodayButtonStyled = styled(CRButtonGroup.CRButton)`
  border-radius: 10px;
  margin-right: 20px;
`;

export const PopoverStyled = styled(Popover).attrs(({ variant }) => ({
  variant,
}))`
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 14px;

  ${variants}

  width: 320px;
  padding: 10px 15px;
  border-radius: 10px;
  z-index: 20;
`;

export const PatientName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const ActionIconStyled = styled(Icon).attrs(({ variant }) => ({
  variant,
}))`
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  font-weight: 800;

  &:hover {
    ${props =>
      variant({
        variants: {
          one: {
            background: props.theme.colors.events[0].hover,
          },
          two: {
            background: props.theme.colors.events[1].hover,
          },
          three: {
            background: props.theme.colors.events[2].hover,
          },
          four: {
            background: props.theme.colors.events[3].hover,
          },
          five: {
            background: props.theme.colors.events[4].hover,
          },
        },
      })}
  }
`;

export const CloseIconStyled = styled(Icon).attrs(() => ({
  icon: 'close',
}))`
  cursor: pointer;
`;
