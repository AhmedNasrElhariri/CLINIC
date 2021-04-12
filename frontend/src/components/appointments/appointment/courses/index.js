import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CRModal } from 'components';
import { useCoursesDefinition } from 'hooks';
import { mapArrWithIdsToChoices } from 'utils/misc';
import * as moment from 'moment';
import { Form, SelectPicker, DatePicker } from 'rsuite';
import {
  CRNumberInput,
  CRSelectInput,
  CRCheckBox,
  CRTimePicker,
  CRDatePicker,
  CRButton,
} from 'components/widgets';
import { CRCard, CRTable } from 'components';
import { StyledSession, TimeDiv, TableDiv } from './style';
let course = [];
let difference = 0;
const options = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
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
  const [times, setTimes] = useState([]);
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
      onChange({ ...formValue, sessions: sessions });
    },
    [formValue, onChange]
  );
  const addTime = useCallback(() => {
    setTimes([...times, '']);
  }, [times]);
  const handleOnChange = useCallback(
    (newVal, index) => {
      const newValue = times.map((oldVal, indx) =>
        index === indx ? newVal : oldVal
      );
      setTimes(newValue);
    },
    [times]
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
              <CRCheckBox
                options={options}
                name="date"
                onChange={() => addTime()}
              ></CRCheckBox>
              <TimeDiv>
                {times.map((val, indx) => (
                  <CRTimePicker
                    block
                    name="time"
                    value={val}
                    accepter={DatePicker}
                    onChange={val => handleOnChange(val, indx)}
                    placement="top"
                  />
                ))}
              </TimeDiv>
            </StyledSession>
            <CRButton
              onClick={() =>
                addSessions(
                  getDates(
                    formValue.date,
                    times,
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
