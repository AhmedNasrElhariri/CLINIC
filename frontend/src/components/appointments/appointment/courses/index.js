import React, { useCallback, useEffect, useState } from 'react';
import { Form, DatePicker, Alert } from 'rsuite';
import * as moment from 'moment';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';

import { useCoursesDefinition, usePermissions } from 'hooks';
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
  CRBrancheTree,
  CRTable,
} from 'components';

import { StyledSession, TableDiv } from './style';
import { formatDate } from 'utils/date';

const options = [
  { name: 'Saturday', checked: false, time: null, day: 6 },
  { name: 'Sunday', checked: false, time: null, day: 0 },
  { name: 'Monday', checked: false, time: null, day: 1 },
  { name: 'Tuesday', checked: false, time: null, day: 2 },
  { name: 'Wednesday', checked: false, time: null, day: 3 },
  { name: 'Thursday', checked: false, time: null, day: 4 },
  { name: 'Friday', checked: false, time: null, day: 5 },
];

const isValidStartDate = (datesMetadata = [], startDate) => {
  return datesMetadata.some(d => moment(startDate).days() === d.day);
};

const allTimeForAllDateSet = datesMetadata => {
  return datesMetadata.every(d => !!d.time);
};

const getDates = (daysMetadata, numOfSessions, startDate) => {
  if (daysMetadata.length !== 7) {
    throw new Error('Invalid Days');
  }
  if (!startDate) {
    throw new Error('Set start Date');
  }

  const checkedDaysMetada = daysMetadata.filter(d => d.checked) || [];

  if (!isValidStartDate(checkedDaysMetada, startDate)) {
    throw new Error('Insert right start date');
  }
  if (!allTimeForAllDateSet(checkedDaysMetada)) {
    throw new Error('Set time for selected days');
  }

  let checkDays = checkedDaysMetada.map(d => d.day);
  const shift = checkedDaysMetada.findIndex(
    d => moment(startDate).days() === d.day
  );
  checkDays = R.range(0, numOfSessions).map(j => {
    const length = checkedDaysMetada.length;
    const i = shift + j;
    const index = i % length;
    const repeat = Math.floor(i / length);
    const day = checkDays[index];
    return day + repeat * 7;
  });

  const sessions = checkDays.reduce((acc, day, index) => {
    const dayMetadataIndex = index % checkedDaysMetada.length;
    const diff = index === 0 ? 0 : day - checkDays[index - 1];
    const lastDay = R.last(acc) || moment(startDate);
    const time = moment(checkedDaysMetada[dayMetadataIndex].time);
    const date = moment(lastDay).add(diff, 'days').set({
      hours: time.hours(),
      minutes: time.minutes(),
      seconds: 0,
      milliseconds: 0,
    });
    return [...acc, date];
  }, []);
  return sessions.map(m => m.toDate());
};
function NewCourse({
  visible,
  onClose,
  onOk,
  formValue,
  header,
  onChange,
  loading,
  type,
  users,
}) {
  const { coursesDefinitions } = useCoursesDefinition();
  const [checkedDays, setCheckedDays] = useState(options);
  const { listActionDoctors, actionDoctors } = usePermissions();

  useEffect(() => {
    listActionDoctors(ACTIONS.Create_Course);
  }, []);

  useEffect(() => {
    onChange(formValue);
  }, [formValue, onChange]);
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

  const handleAddSessions = () => {
    try {
      if (!course) {
        throw new Error('Please select a course');
      }
      const sessions = getDates(checkedDays, course.units, formValue.startDate);
      addSessions(sessions);
    } catch (e) {
      Alert.error(e.message);
    }
  };

  const course = formValue?.course;
  return (
    <CRModal show={visible} header={header} onHide={onClose} onOk={onOk} loading={loading}>
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'create' ? (
          <>
            <CRSelectInput
              label="Course Name"
              name="course"
              placeholder="Select Course"
              data={coursesDefinitions}
              block
              sameValue
            />
            <CRNumberInput
              label="Price"
              name="price"
              title="Price"
              disabled
              value={course?.price || ''}
            />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.Create_Course}
            />
            <CRNumberInput label="Discount" name="discount" />
            <CRNumberInput label="Paid" name="paid" />
            <CRSelectInput
              label="Doctor"
              name="doctorId"
              placeholder="Select Doctor"
              data={actionDoctors}
              block
            />
            <CRDatePicker
              label="StartDate"
              block
              name="startDate"
              accepter={DatePicker}
            />
            {formValue?.course?.type === 'Session' && (
              <>
                <StyledSession>
                  {checkedDays.map(({ name, checked, time }, idx) => (
                    <Div display="flex" key={idx}>
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
                          style={{ width: 150, marginLeft: 20 }}
                        />
                      )}
                    </Div>
                  ))}
                </StyledSession>
                {formValue?.sessions?.length > 0 && (
                  <TableDiv>
                    <CRCard borderless>
                      <CRTable autoHeight data={formValue.sessions || []}>
                        <CRTable.CRColumn flexGrow={1}>
                          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
                          <CRTable.CRCell>
                            {date => (
                              <CRTable.CRCellStyled bold>
                                {formatDate(date, 'dddd, DD-MM-YYYY')}
                              </CRTable.CRCellStyled>
                            )}
                          </CRTable.CRCell>
                        </CRTable.CRColumn>
                        <CRTable.CRColumn flexGrow={1}>
                          <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
                          <CRTable.CRCell>
                            {date => (
                              <CRTable.CRCellStyled bold>
                                {formatDate(date, 'hh : mm a')}
                              </CRTable.CRCellStyled>
                            )}
                          </CRTable.CRCell>
                        </CRTable.CRColumn>
                      </CRTable>
                    </CRCard>
                  </TableDiv>
                )}
                <CRButton onClick={handleAddSessions}>Generate</CRButton>
              </>
            )}
          </>
        ) : type === 'edit' ? (
          <>
            <CRNumberInput label="Paid" name="paid" title="Paid" />
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.ViewCourses_Patient}
            />
          </>
        ) : type === 'consumed' ? (
          <CRNumberInput
            label="Consumed Units"
            name="consumed"
            title="Consumed Units"
          />
        ) : type === 'finishCourse' ? (
          <Div>Are you sure that you want to finish this course ?</Div>
        ) : (
          <CRSelectInput
            label="Doctor Name"
            name="doctorId"
            placeholder="Select Doctor"
            block
            data={users}
          />
        )}
      </Form>
    </CRModal>
  );
}

NewCourse.defaultProps = {
  type: 'create',
};

export default NewCourse;
