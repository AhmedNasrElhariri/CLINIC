import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, SelectPicker, DatePicker } from 'rsuite';
import * as moment from 'moment';

import { useCoursesDefinition } from 'hooks';
import { mapArrWithIdsToChoices } from 'utils/misc';
import {
  CRNumberInput,
  CRSelectInput,
  CRCheckBox,
  CRTimePicker,
  CRDatePicker,
  CRButton,
  CRModal,
  Div,
  CRCard,
  CRTable,
} from 'components';

import { StyledSession, TimeDiv, TableDiv } from './style';

let course = [];
let difference = 0;
const options = [
  {
    name: 'Saturday',
    checked: false,
    time: null,
  },
  {
    name: 'Sunday',
    checked: false,
    time: null,
  },
  {
    name: 'Monday',
    checked: false,
    time: null,
  },
  {
    name: 'Tuesday',
    checked: false,
    time: null,
  },
  {
    name: 'Wednesday',
    checked: false,
    time: null,
  },
  {
    name: 'Thursday',
    checked: false,
    time: null,
  },
  {
    name: 'Friday',
    checked: false,
    time: null,
  },
];

const calcFirstDayDate = (startDay, firstDay) => {
  const startDayName = moment(startDay).format('dddd');
  const startDayIndex = options.indexOf(startDayName);
  const firstDayIndex = options.indexOf(firstDay);
  if (startDayIndex === firstDayIndex) {
    difference = 0;
  } else if (startDayIndex < firstDayIndex) {
    difference = firstDayIndex - startDayIndex;
  } else {
    difference = firstDayIndex - startDayIndex + 7;
  }
  const firstDayDate = new Date(
    new Date(startDay).getTime() + difference * 24 * 60 * 60 * 1000
  );
  const firstDayDateResult = firstDayDate.toISOString().split('T')[0];
  return firstDayDateResult;
};
const getDates = (days, times, startDay, numOfSessions) => {
  let steps = 0;
  let oldDate = {};
  const daysDate = days.map((day, indx) => {
    return {
      date: calcFirstDayDate(startDay, day),
      time: times[indx],
    };
  });
  numOfSessions = numOfSessions - days.length;
  while (numOfSessions > steps) {
    for (let i = 0; i < days.length; i++) {
      oldDate = daysDate[daysDate.length - days.length];
      const newDate = new Date(
        new Date(oldDate.date).getTime() + 7 * 24 * 60 * 60 * 1000
      );
      let newSession = { date: '', time: '' };
      newSession.time = oldDate.time;
      newSession.date = newDate.toISOString().split('T')[0];
      daysDate.push(newSession);
      steps = steps + 1;
    }
  }
  daysDate.length = numOfSessions + days.length;
  return daysDate;
};
function Course({ visible, onClose, onOk, formValue, onChange, type, users }) {
  const header = useMemo(() => 'Courses', []);
  const { coursesDefinition } = useCoursesDefinition({});
  const [item, setItem] = useState('');
  const [numberSessions, setNumberSessions] = useState(0);
  // const [times, setTimes] = useState(defaultTimes);
  const [checkedDays, setCheckedDays] = useState(options);
  const specificCourse = value => {
    course = coursesDefinition.find(course => course.id === value);
    setItem(course.price);
    setNumberSessions(course.units);
  };
  useEffect(() => {
    formValue.price = item;
    onChange(formValue);
  }, [item, formValue, onChange]);
  const addSessions = useCallback(
    sessions => {
      onChange({ ...formValue, sessions });
    },
    [formValue, onChange]
  );

  const toggleTime = useCallback(
    (val, idx) => {
      const newOption = {
        ...checkedDays[idx],
        checked: val,
      };
      const newOptions = checkedDays.map((o, index) =>
        index === idx ? newOption : o
      );
      setCheckedDays(newOptions);
    },
    [checkedDays]
  );

  const handleTimeChange = useCallback(
    (val, idx) => {
      const newOption = {
        ...checkedDays[idx],
        time: val,
      };
      const newOptions = checkedDays.map((o, index) =>
        index === idx ? newOption : o
      );
      setCheckedDays(newOptions);
    },
    [checkedDays]
  );

  return (
    <CRModal show={visible} header={header} onHide={onClose} onOk={onOk}>
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'create' ? (
          <>
            <CRSelectInput
              label="Course Name"
              name="courseId"
              placeholder="Select Course"
              block
              cleanable={false}
              searchable={false}
              accepter={SelectPicker}
              data={mapArrWithIdsToChoices(coursesDefinition)}
              onSelect={data => specificCourse(data)}
            />
            <CRNumberInput
              label="Price"
              name="price"
              title="Price"
              value={item}
            />
            <CRNumberInput label="Discount" name="discount" title="Discount" />
            <CRDatePicker
              label="StartDate"
              block
              name="startDate"
              accepter={DatePicker}
              placement="top"
            />
            <StyledSession>
              <TableDiv>
                <CRCard borderless>
                  <CRTable autoHeight data={formValue.sessions}>
                    <CRTable.CRColumn flexGrow={1}>
                      <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
                      <CRTable.CRCell>
                        {({ date }) => (
                          <CRTable.CRCellStyled bold>
                            {date}
                          </CRTable.CRCellStyled>
                        )}
                      </CRTable.CRCell>
                    </CRTable.CRColumn>
                    <CRTable.CRColumn flexGrow={1}>
                      <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
                      <CRTable.CRCell>
                        {({ time }) => (
                          <CRTable.CRCellStyled bold>
                            {time.getHours()}:{time.getMinutes()}
                          </CRTable.CRCellStyled>
                        )}
                      </CRTable.CRCell>
                    </CRTable.CRColumn>
                  </CRTable>
                </CRCard>
              </TableDiv>
              {checkedDays.map(({ name, checked, time }, idx) => (
                <Div display="flex">
                  <Div width={100}>
                    <CRCheckBox
                      name="date"
                      value={checked}
                      onChange={(_, val) => toggleTime(val, idx)}
                    >
                      {name}
                    </CRCheckBox>
                  </Div>
                  {checked && (
                    <CRTimePicker
                      block
                      name="time"
                      value={time}
                      accepter={DatePicker}
                      onChange={val => handleTimeChange(val, idx)}
                      placement="top"
                      style={{ width: 150, marginLeft: 20 }}
                    />
                  )}
                </Div>
              ))}
            </StyledSession>
            <CRButton
              onClick={() =>
                addSessions(
                  getDates(
                    formValue.date,
                    null,
                    // times,
                    formValue.startDate,
                    numberSessions
                  )
                )
              }
            >
              Generate
            </CRButton>
          </>
        ) : type === 'edit' ? (
          <CRNumberInput label="Paid" name="paid" title="Paid" />
        ) : (
          <CRSelectInput
            label="Doctor Name"
            name="doctorId"
            placeholder="Select Doctor"
            block
            cleanable={false}
            searchable={false}
            accepter={SelectPicker}
            data={mapArrWithIdsToChoices(users)}
          />
        )}
      </Form>
    </CRModal>
  );
}

Course.defaultProps = {
  type: 'create',
};

export default Course;
