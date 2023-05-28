import React, { memo } from 'react';
import moment from 'moment';
import { Views } from 'react-big-calendar';
import { Navigate } from 'react-big-calendar';

import { TodayButtonStyled } from './style';
import { LeftArrowIcon, RightArrowIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { H4, CRButtonGroup, CRDatePicker, Div } from 'components';
import { Form } from 'rsuite';
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
  const onPickerChange = newDate => onNavigate(Navigate.DATE, newDate);

  return (
    <Div
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
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
        <Form>
          <CRDatePicker
            name="date"
            style={{ marginTop: '-10px', marginRight: '10px' }}
            onChange={val => onPickerChange(val)}
          />
        </Form>
        <TodayButtonStyled
          onClick={() => onNavigate('TODAY')}
          active={sameDate(date)}
        >
          Today
        </TodayButtonStyled>
        <CRButtonGroup activeKey={view} onSelect={onView}>
          {/* <CRButtonGroup.CRButton eventKey={Views.MONTH}>
            Month
          </CRButtonGroup.CRButton> */}
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
