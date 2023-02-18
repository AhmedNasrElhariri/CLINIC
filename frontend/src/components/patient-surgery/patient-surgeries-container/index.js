import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Can } from 'components/user/can';
import { Schema } from 'rsuite';
import { Div, CRButton, MainContainer } from 'components';
import moment from 'moment';
import ListPatientSurgeries from '../list-patient-surgeries';
import NewPatientSurgery from '../new-patient-surgery';
import PatientSurgeryFilter from './filter';
import { filterPatientSurgery } from 'services/patient-surgery';
import { useForm, usePatientSurgeries, useModal, useAuth } from 'hooks';
import { useTranslation } from 'react-i18next';

const initValue = {
  patientId: null,
  surgeryId: null,
  hospitalId: null,
  date: null,
  time: null,
  anesthesia: null,
  anesthesiaDoctorName: '',
  assistantFees: 0,
  anesthesiaFees: 0,
  others: 0,
  fees: 0,
  hospitalFees: 0,
};
const inialCurrentPage = {
  activePage: 1,
};
const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  patientId: StringType().isRequired('patient is required'),
  surgeryId: StringType().isRequired('surgery is required'),
  hospitalId: StringType().isRequired('hospital is required'),
  date: DateType().isRequired('date is required'),
});

const PatientSurgeriesContainer = () => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const history = useHistory();
  const { can } = useAuth();
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const [type, setType] = useState('');
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue,
      model,
    });
  const { formValue: filterFormValue, setFormValue: setFilterFormValue } =
    useForm({
      surgery: null,
      hospital: null,
      patientId: null,
      time: [],
    });
  const {
    createPatientSurgery,
    editPatientSurgery,
    patientSurgeries,
    patientSurgeriesCount,
    loading,
  } = usePatientSurgeries({
    surgery: filterFormValue?.surgery,
    hospital: filterFormValue?.hospital,
    patientId: filterFormValue?.patientId,
    time: filterFormValue?.time,
    page: page,
    onCreate: () => {
      close();
    },
  });
  const pages = Math.ceil(patientSurgeriesCount / 20);
  const handleOnClickCreate = useCallback(() => {
    setType('create');
    open();
  }, [open, setType]);
  const handleAdd = useCallback(() => {
    const { time, date, ...rest } = formValue;
    const timeDate = moment(formValue.time);

    let Date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    const newData = { date: Date, ...rest };
    if (type === 'create') {
      createPatientSurgery(newData);
    } else {
      editPatientSurgery(newData);
    }
  }, [createPatientSurgery, editPatientSurgery, type, formValue]);

  const filteredList = useMemo(
    () => filterPatientSurgery(patientSurgeries, filterFormValue),
    [filterFormValue, patientSurgeries]
  );

  const handleSurgeryClick = useCallback(
    ({ appointment }) => {
      if (can('ViewSurgeries', 'Patient')) {
        history.push(`/appointments/${appointment.id}`);
      }
    },
    [history, can]
  );

  const handleClickEdit = useCallback(
    data => {
      const {
        patient,
        surgery,
        hospital,
        date,
        anesthesia,
        anesthesiaDoctorName,
        fees,
        hospitalFees,
        assistantFees,
        anesthesiaFees,
        others,
        id,
      } = data;
      setFormValue({
        patientId: patient.id,
        surgeryId: surgery.id,
        hospitalId: hospital.id,
        date: date,
        anesthesia: anesthesia,
        anesthesiaDoctorName: anesthesiaDoctorName,
        fees: fees,
        hospitalFees: hospitalFees,
        assistantFees: assistantFees,
        anesthesiaFees: anesthesiaFees,
        others: others,
        id: id,
      });
      setType('edit');
      open();
    },
    [setFormValue, open, setType]
  );
  return (
    <>
      <MainContainer
        title={t('patientsSurgeries')}
        more={
          <Div display="flex">
            <Can I="Create" a="Surgery">
              <CRButton variant="primary" onClick={handleOnClickCreate}>
                {t('surgery')} +
              </CRButton>
            </Can>
          </Div>
        }
      >
        <NewPatientSurgery
          visible={visible}
          formValue={formValue}
          onChange={setFormValue}
          onOk={handleAdd}
          onClose={close}
          checkResult={checkResult}
          validate={validate}
          show={show}
          setShow={setShow}
          loading={loading}
          type={type}
        />
        <Can I="List" a="Surgery">
          <PatientSurgeryFilter
            formValue={filterFormValue}
            onChange={setFilterFormValue}
          />
          <ListPatientSurgeries
            patientSurgeries={filteredList}
            onSurgeryClick={handleSurgeryClick}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            onEdit={handleClickEdit}
          />
        </Can>
      </MainContainer>
    </>
  );
};

PatientSurgeriesContainer.defaultProps = {
  surgeries: [],
};

PatientSurgeriesContainer.propTypes = {};

export default PatientSurgeriesContainer;
