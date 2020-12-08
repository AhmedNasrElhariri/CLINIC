import React, { memo } from 'react';
import moment from 'moment';
import { Views } from 'react-big-calendar';

import { Div } from 'components';
import { TodayButtonStyled } from './style';
import { LeftArrowIcon, RightArrowIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { H4, CRButtonGroup } from 'components';

import Filter from './filter';

const renderDate = (date, view) => {
  switch (view) {
    case Views.DAY:
      return formatDate(date, 'DD MMMM YYYY');
    default:
      return formatDate(date, 'MMMM YYYY');
  }
};

const sameDate = date => moment(date).isSame(new Date(), 'day');

const dummyData = {
  doctors: [
    {
      id: '1',
      name: 'Ahmed',
      specialization: '1',
      branches: ['1'],
    },
    {
      id: '2',
      name: 'khaled',
      specialization: '2',
      branches: ['2'],
    },
  ],
};
const { doctors } = dummyData;

function Toolbar({ date, view, onNavigate, onView }) {
  return (
    <Div
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
      <Filter data={doctors} />

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
        <CRButtonGroup activeKey={view} onSelect={onView}>
          <CRButtonGroup.CRButton eventKey={Views.MONTH}>
            Month
          </CRButtonGroup.CRButton>
          <CRButtonGroup.CRButton eventKey={Views.WEEK}>
            Week
          </CRButtonGroup.CRButton>
          <CRButtonGroup.CRButton eventKey={Views.DAY}>
            Day
          </CRButtonGroup.CRButton>
        </CRButtonGroup>
      </Div>
    </Div>
  );
}

export default memo(Toolbar);
