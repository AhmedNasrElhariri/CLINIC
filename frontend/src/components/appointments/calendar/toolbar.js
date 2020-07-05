import React, { memo } from 'react';
import moment from 'moment';
import { Views } from 'react-big-calendar';

import { Div } from 'components';
import { ButtonStyled, ButtonsGroupStyled, TodayButtonStyled } from './style';
import { LeftArrowIcon, RightArrowIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { H4 } from 'components';

const renderDate = (date, view) => {
  switch (view) {
    case Views.DAY:
      return formatDate(date, 'DD MMMM YYYY');
    default:
      return formatDate(date, 'MMMM YYYY');
  }
};

const sameDate = date => moment(date).isSame(new Date(), 'day');

function Toolbar({ date, view, onNavigate, onView }) {
  return (
    <Div display="flex" justifyContent="space-between" mb={4}>
      <Div display="flex" alignItems="center">
        <H4>{renderDate(date, view)}</H4>
        <Div mx={4} cursor="pointer">
          <LeftArrowIcon onClick={() => onNavigate('PREV')} />
        </Div>
        <Div cursor="pointer">
          <RightArrowIcon onClick={() => onNavigate('NEXT')} />
        </Div>
      </Div>
      <Div display="flex">
        <TodayButtonStyled
          onClick={() => onNavigate('TODAY')}
          active={sameDate(date)}
        >
          Today
        </TodayButtonStyled>
        <ButtonsGroupStyled>
          <ButtonStyled
            active={view === Views.MONTH}
            onClick={() => onView(Views.MONTH)}
          >
            Month
          </ButtonStyled>
          <ButtonStyled
            active={view === Views.WEEK}
            onClick={() => onView(Views.WEEK)}
          >
            Week
          </ButtonStyled>
          <ButtonStyled
            active={view === Views.DAY}
            onClick={() => onView(Views.DAY)}
          >
            Day
          </ButtonStyled>
        </ButtonsGroupStyled>
      </Div>
    </Div>
  );
}

export default memo(Toolbar);
