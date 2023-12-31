import React from 'react';
import moment from 'moment';
import { Div, CRDateRangePicker } from 'components';
import { DateRangePicker, Form } from 'rsuite';
const { allowedRange } = DateRangePicker;
const Toolbar = ({ onChangePeriod, lastTimeFrameDay, t }) => {
  const startDayOfYear = moment().startOf('year').toDate();
  const lastDay = lastTimeFrameDay?.date || startDayOfYear;
  return (
    <Div display="flex">
      <Div width={180}>
        <Form fluid>
          <CRDateRangePicker
            name=""
            label=""
            disabledDate={allowedRange(lastDay, new Date())}
            placeholder={t('timeframe')}
            size="sm"
            block
            small
            placement="auto"
            $noLabel
            onChange={onChangePeriod}
          />
        </Form>
      </Div>
    </Div>
  );
};

Toolbar.defaultProps = {
  data: {},
};

export default Toolbar;
