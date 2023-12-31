import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, DatePicker, Alert, InputNumber } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as moment from 'moment';
import * as R from 'ramda';
import { ACTIONS } from 'utils/constants';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import {
  useCoursesDefinition,
  usePermissions,
  useBankDefinition,
  useCourseTypeDefinition,
} from 'hooks';
import { useTranslation } from 'react-i18next';
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
  CRRadio,
  H6,
  CRTextInput,
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
const courseTypes = [
  { value: 'standard', name: 'Standard' },
  { value: 'custom', name: 'Custom' },
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
  bank,
  setBank,
  visa,
  setVisa,
  selectedSessions,
  setSelectedSessions,
  consumedParts,
  setConsumedParts,
  courseParts,
}) {
  const [session, setSession] = useState({});
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionPrice, setSessionPrice] = useState(0);
  const { coursesDefinitions } = useCoursesDefinition();
  const { banksDefinition } = useBankDefinition({});
  const { courseTypesDefinition } = useCourseTypeDefinition({});
  const [checkedDays, setCheckedDays] = useState(options);
  const { t } = useTranslation();
  const { listActionDoctors, actionDoctors } = usePermissions();
  useEffect(() => {
    listActionDoctors(ACTIONS.Create_Course);
  }, [listActionDoctors]);

  useEffect(() => {
    setSessionPrice(session?.price || 0);
  }, [session]);

  const handleChangeNumberOfNunits = useCallback(
    (val, index) => {
      const newSession = { ...selectedSessions[index], numberOfUnits: val };
      const newSelectedSessions = selectedSessions;
      newSelectedSessions[index] = newSession;
      setSelectedSessions(newSelectedSessions);
    },
    [setSelectedSessions, selectedSessions]
  );

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
  const add = useCallback(() => {
    if (R.isNil(session) || R.isEmpty(session)) {
      return;
    }
    const updatedSession = {
      ...session,
      number: sessionNumber,
      price: sessionPrice,
      numberOfUnits: sessionNumber,
    };
    setSelectedSessions([...selectedSessions, updatedSession]);
  }, [
    setSelectedSessions,
    sessionNumber,
    sessionPrice,
    selectedSessions,
    session,
  ]);
  const totalCoursePrice = useMemo(
    () =>
      (selectedSessions || []).reduce(
        (acc, { number, price }) => acc + number * price,
        0
      ),
    [selectedSessions]
  );
  const handleDelete = useCallback(
    idx => {
      setSelectedSessions(R.remove(idx, 1));
    },
    [setSelectedSessions]
  );

  useEffect(() => {
    setConsumedParts &&
      setConsumedParts(
        (courseParts || []).map(({ id, part: { name }, totalUnits }) => ({
          id,
          amount: 0,
          notes: '',
          name,
          totalUnits,
        }))
      );
  }, [courseParts, setConsumedParts, consumedParts?.length]);
  const handleChangeCoursePart = useCallback(
    (val, checkChange, indx) => {
      setConsumedParts &&
        setConsumedParts(
          (consumedParts || []).map(
            ({ name, amount, notes, id, totalUnits }, index) => {
              return index === indx
                ? checkChange === 'amount'
                  ? { name, amount: val, notes, id, totalUnits }
                  : { name, amount, notes: val, id, totalUnits }
                : { name, amount, notes, id, totalUnits };
            }
          )
        );
    },
    [consumedParts] //not change the dependencies so that does not cause infinte loop
  );
  const choices = useMemo(() => {
    const allChoices = [...courseTypesDefinition];
    return allChoices.map(s => ({ name: s.name, id: s }));
  }, [courseTypesDefinition]);
  const course = formValue?.course;

  return (
    <CRModal
      show={visible}
      header={header}
      onHide={onClose}
      onOk={onOk}
      loading={loading}
    >
      <Form fluid formValue={formValue} onChange={onChange}>
        {type === 'create' ? (
          <>
            <CRRadio options={courseTypes} name="courseType" />
            {formValue.courseType === 'custom' ? (
              <Div width={700} mr={20}>
                <Form fluid>
                  <Div
                    display="flex"
                    m="10px 0px"
                    justifyContent="space-between"
                  >
                    <CRButton mt="10px" onClick={() => add()}>
                      {t('add')}
                    </CRButton>
                    <Div p="10px" border="1px solid black">
                      Total: {totalCoursePrice}
                    </Div>
                  </Div>
                  <Div display="flex" justifyContent="space-around">
                    <CRSelectInput
                      label={t('coursePartName')}
                      placeholder={t('select')}
                      value={session}
                      onChange={val => setSession(val || null)}
                      data={choices}
                      style={{ width: '170px' }}
                    />
                    <CRNumberInput
                      label={t('number')}
                      name="sessionsNumber"
                      value={sessionNumber}
                      onChange={setSessionNumber}
                      style={{ minWidth: '80px' }}
                    ></CRNumberInput>
                    <CRNumberInput
                      label={t('price')}
                      name="coursePartPrice"
                      value={sessionPrice}
                      onChange={setSessionPrice}
                      style={{ width: '70px' }}
                      float
                    ></CRNumberInput>
                  </Div>
                </Form>
                <H6 mt={2} color="texts.2">
                  <NumberFormat
                    value={session?.price}
                    displayType="text"
                    thousandSeparator
                  />
                </H6>
                <Div my={3}>
                  <ListInvoiceItems
                    items={selectedSessions}
                    onDelete={handleDelete}
                  />
                </Div>
                {selectedSessions &&
                  selectedSessions.map((session, indx) => (
                    <Div mb={2}>
                      <CRNumberInput
                        label={`Number of Units ${session?.name}`}
                        name="numberOfUnits"
                        value={session?.numberOfUnits}
                        onChange={val => handleChangeNumberOfNunits(val, indx)}
                        layout="inline"
                      ></CRNumberInput>
                    </Div>
                  ))}
              </Div>
            ) : (
              <>
                <CRSelectInput
                  label={t('courseName')}
                  name="course"
                  placeholder={t('select')}
                  data={coursesDefinitions}
                  block
                  sameValue
                />
                <label>Price:</label>
                <InputNumber
                  label={t('price')}
                  value={course?.price}
                  disabled
                />
              </>
            )}

            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.Create_Course}
            />
            <CRNumberInput label="Discount" name="discount" />
            <CRButton
              onClick={() => {
                setVisa(true);
              }}
              mt={10}
            >
              {t('payByVisa')}
            </CRButton>
            {visa && (
              <Form>
                <CRSelectInput
                  label={t('bank')}
                  name="bank"
                  data={banksDefinition}
                  value={bank}
                  onChange={setBank}
                  placeholder={t('select')}
                  style={{ width: '230px' }}
                />
              </Form>
            )}
            <CRNumberInput label={t('paid')} name="paid" />
            <CRSelectInput
              label={t('doctor')}
              name="doctorId"
              placeholder={t('select')}
              data={actionDoctors}
              block
            />
            <CRDatePicker
              label={t('startDate')}
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
                          <CRTable.CRHeaderCell>
                            {t('date')}
                          </CRTable.CRHeaderCell>
                          <CRTable.CRCell>
                            {date => (
                              <CRTable.CRCellStyled bold>
                                {formatDate(date, 'dddd, DD-MM-YYYY')}
                              </CRTable.CRCellStyled>
                            )}
                          </CRTable.CRCell>
                        </CRTable.CRColumn>
                        <CRTable.CRColumn flexGrow={1}>
                          <CRTable.CRHeaderCell>
                            {t('time')}
                          </CRTable.CRHeaderCell>
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
        ) : type === 'edit' || type === 'editPaymentHistory' ? (
          <>
            <CRButton
              onClick={() => {
                setVisa(true);
              }}
              mr={10}
            >
              {t('payByVisa')}
            </CRButton>
            {visa && (
              <Form>
                <CRSelectInput
                  label={t('bank')}
                  name="bank"
                  data={banksDefinition}
                  value={bank}
                  onChange={setBank}
                  placeholder={t('select')}
                  style={{ width: '230px' }}
                />
              </Form>
            )}
            <CRNumberInput label={t('cashPayment')} name="paid" title="Paid" />
            {bank != null && (
              <CRNumberInput
                label={t('bankPayment')}
                name="visaPaid"
                value={formValue.visaPaid}
                title="visaPaid"
              />
            )}
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.ViewCourses_Patient}
            />
          </>
        ) : type === 'addNewUnits' ||
          type === 'editConsumedUnits' ||
          type === 'editUnitsTransactions' ? (
          <>
            {courseParts && courseParts.length > 0 ? (
              <>
                <Form
                  formValue={consumedParts}
                  onChange={setConsumedParts}
                  fluid
                >
                  {consumedParts?.map(
                    ({ id, amount, notes, name, totalUnits }, indx) => (
                      <Div mb={type === 'addNewUnits' ? 2 : 0} display="flex">
                        <CRNumberInput
                          label={`Number of Units (${name})`}
                          value={amount}
                          layout={
                            type === 'addNewUnits' ? 'inline' : 'vertical'
                          }
                          onChange={val =>
                            handleChangeCoursePart(val, 'amount', indx)
                          }
                          style={{ minWidth: '100px' }}
                        ></CRNumberInput>
                        {type === 'addNewUnits' && (
                          <CRTextInput
                            label="Notes"
                            layout={
                              type === 'addNewUnits' ? 'inline' : 'vertical'
                            }
                            value={notes}
                            onChange={val =>
                              handleChangeCoursePart(val, 'notes', indx)
                            }
                          />
                        )}
                        {type === 'editConsumedUnits' && (
                          <Div display="flex" margin="auto">
                            <Div fontWeight="bold">Total Old Units</Div>
                            <Div>
                              {':  '}
                              {totalUnits}
                            </Div>
                          </Div>
                        )}
                      </Div>
                    )
                  )}
                </Form>
                {type === 'addNewUnits' && (
                  <CRSelectInput
                    label={t('doctor')}
                    name="consumedDoctorId"
                    placeholder={t('select')}
                    data={actionDoctors}
                    block
                  />
                )}
              </>
            ) : (
              <CRNumberInput
                label={t('consumedUnits')}
                name="consumed"
                title={t('consumedUnits')}
              />
            )}
            {(type === 'addNewUnits' || type === 'editUnitsTransactions') &&
              !courseParts.length > 0 && (
                <CRTextInput
                  label={t('notes')}
                  name="notes"
                  title={t('notes')}
                />
              )}
          </>
        ) : type === 'finishCourse' ? (
          <Div>{t('finishCourseMessage')} </Div>
        ) : type === 'deleteCourse' ? (
          <Div>
            <Div>{t('deleteCourseMessage')} </Div>
            <CRButton
              onClick={() => {
                setVisa(true);
              }}
              mt={10}
            >
              {t('payByVisa')}
            </CRButton>
            {visa && (
              <Form>
                <CRSelectInput
                  label={t('bank')}
                  name="bank"
                  data={banksDefinition}
                  value={bank}
                  onChange={setBank}
                  placeholder={t('select')}
                  style={{ width: '230px' }}
                />
              </Form>
            )}
            <Div>
              <CRNumberInput
                label={t('refundMoney')}
                name="refund"
                title="Refund Money"
              />
              <CRBrancheTree
                formValue={formValue}
                onChange={onChange}
                action={ACTIONS.Create_Course}
              />
            </Div>
          </Div>
        ) : (
          <CRSelectInput
            label={t('doctor')}
            name="doctorId"
            placeholder={t('select')}
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
