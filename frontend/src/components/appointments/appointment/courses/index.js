import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, DatePicker, Alert,InputNumber } from 'rsuite';
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
const withAndWithoutDoctorFeesData = [
  { id: 'withDoctorFees', name: 'With doctor fees' },
  { id: 'withoutDoctorFees', name: 'Without doctor fees' },
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
  totalCoursePrice,
}) {
  const [session, setSession] = useState({});
  const [extraUnits, setExtraUnits] = useState(0);
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionPrice, setSessionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { coursesDefinitions } = useCoursesDefinition();
  const { banksDefinition } = useBankDefinition({});
  const { courseTypesDefinition } = useCourseTypeDefinition({});
  const [checkedDays, setCheckedDays] = useState(options);
  const [withAndWithoutDoctorFees, setWithAndWithoutDoctorFees] =
    useState('withoutDoctorFees');
  const { t } = useTranslation();
  const { listActionDoctors, actionDoctors } = usePermissions();
  useEffect(() => {
    listActionDoctors(ACTIONS.Create_Course);
  }, []);
  useEffect(() => {
    if (session?.price) {
      setSessionPrice(session.price);
      setTotalPrice(session.price * sessionNumber);
    }
  }, [session]);
  const handleChangeSessionInputs = useCallback(
    (value, type) => {
      if (type === 'Number') {
        setSessionNumber(value);
        setTotalPrice(value * sessionPrice);
      } else if (type === 'TotalPrice') {
        setTotalPrice(value);
        setSessionPrice(value / sessionNumber);
      } else {
        setSessionPrice(value);
        setTotalPrice(value * sessionNumber);
      }
    },
    [
      sessionPrice,
      totalPrice,
      sessionNumber,
      setTotalPrice,
      setSessionPrice,
      setSessionNumber,
    ]
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
      totalPrice: totalPrice,
      extraUnits: extraUnits,
    };
    setSelectedSessions([...selectedSessions, updatedSession]);
  }, [
    formValue,
    setSelectedSessions,
    sessionNumber,
    sessionPrice,
    selectedSessions,
    session,
    totalPrice,
    extraUnits,
  ]);
  const handleDelete = useCallback(
    idx => {
      setSelectedSessions(R.remove(idx, 1));
    },
    [setSelectedSessions]
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
              withAndWithoutDoctorFees === 'withoutDoctorFees' ? (
                <Div width={500} mr={20}>
                  <Form fluid>
                    <Div
                      display="flex"
                      m="10px 0px"
                      justifyContent="space-between"
                    >
                      <CRButton mt="10px" onClick={() => add()}>
                        {t('add')}
                      </CRButton>
                      {formValue.courseType === 'custom' && (
                        <CRSelectInput
                          placeholder={t('select')}
                          onChange={val => setWithAndWithoutDoctorFees(val)}
                          data={withAndWithoutDoctorFeesData}
                          value={withAndWithoutDoctorFees}
                          style={{ width: '190px', marginLeft: '10px' }}
                        />
                      )}
                    </Div>
                    <Div display="flex" justifyContent="space-around">
                      <CRSelectInput
                        label={t('coursePartName')}
                        placeholder={t('select')}
                        value={session}
                        onChange={val =>
                          val == null ? setSession(null) : setSession(val)
                        }
                        data={choices}
                        style={{ width: '170px' }}
                      />
                      <CRNumberInput
                        label={t('number')}
                        name="sessionsNumber"
                        value={sessionNumber}
                        onChange={setSessionNumber}
                        style={{ width: '50px' }}
                      ></CRNumberInput>
                      <CRNumberInput
                        label={t('price')}
                        name="coursePartPrice"
                        value={sessionPrice}
                        onChange={setSessionPrice}
                        style={{ width: '70px' }}
                      ></CRNumberInput>
                    </Div>
                  </Form>
                  <H6 mt={2} color="texts.2">
                    <NumberFormat
                      value={session.price}
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
                  <CRNumberInput
                    label={t('units')}
                    name="customUnits"
                  ></CRNumberInput>
                </Div>
              ) : (
                <Div mr={20}>
                  <Form fluid>
                    <Div
                      display="flex"
                      m="10px 0px"
                      justifyContent="space-between"
                    >
                      <CRButton mt="10px" onClick={() => add()}>
                        {t('add')}
                      </CRButton>
                      {formValue.courseType === 'custom' && (
                        <CRSelectInput
                          placeholder={t('select')}
                          onChange={val => setWithAndWithoutDoctorFees(val)}
                          data={withAndWithoutDoctorFeesData}
                          value={withAndWithoutDoctorFees}
                          style={{ width: '190px', marginLeft: '10px' }}
                        />
                      )}

                      <Div
                        mt="10px"
                        padding="5px 10px"
                        border="1px solid gray"
                        ml="20px"
                      >
                        Total price : {totalCoursePrice}
                      </Div>
                    </Div>
                    <Div display="flex" justifyContent="space-around">
                      <CRSelectInput
                        label={t('coursePartName')}
                        placeholder={t('select')}
                        value={session}
                        onChange={val =>
                          val == null ? setSession({}) : setSession(val)
                        }
                        data={choices}
                        style={{ width: '170px' }}
                      />
                      <CRNumberInput
                        label={t('number')}
                        name="sessionsNumber"
                        value={sessionNumber}
                        onChange={v => handleChangeSessionInputs(v, 'Number')}
                        style={{ width: '100px' }}
                      ></CRNumberInput>
                      <CRNumberInput
                        label={t('price')}
                        name="coursePartPrice"
                        value={sessionPrice}
                        onChange={v =>
                          handleChangeSessionInputs(v, 'SessionPrice')
                        }
                        style={{ width: '100px' }}
                      ></CRNumberInput>
                      <CRNumberInput
                        label={t('totalPrice')}
                        name="partTotalPrice"
                        value={totalPrice}
                        onChange={v =>
                          handleChangeSessionInputs(v, 'TotalPrice')
                        }
                        style={{ width: '100px' }}
                      ></CRNumberInput>
                      <CRNumberInput
                        label={t('extraUnits')}
                        name="extraUnits"
                        value={extraUnits}
                        onChange={setExtraUnits}
                        style={{ width: '100px' }}
                      ></CRNumberInput>
                    </Div>
                  </Form>
                  <H6 mt={2} color="texts.2">
                    <NumberFormat
                      value={session.price}
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
                </Div>
              )
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
            <CRNumberInput
              label={t('consumedUnits')}
              name="consumed"
              title={t('consumedUnits')}
            />
            {(type === 'addNewUnits' || type === 'editUnitsTransactions') && (
              <CRTextInput label={t('notes')} name="notes" title={t('notes')} />
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
