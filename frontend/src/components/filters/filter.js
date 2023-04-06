import React, { useEffect, useMemo } from 'react';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import { useAppSelector, useAppDispatch } from 'redux-store/hooks';
import {
  selectSelectedBranch,
  selectSelectedSpecialty,
  selectSelectedDoctor,
  setSelectedSpecialty,
  setSelectedDoctor,
  setSelectedBranch,
} from 'features/root/rootSlice';
import {
  SELECTED_BRANCH,
  SELECTED_DOCTOR,
  SELECTED_SPECIALTY,
} from 'utils/constants';

function AppointmentsFilter({
  formValue,
  onChange,
  branches,
  formClassName,
  todayApp,
  cleanable,
}) {
  const dispatch = useAppDispatch();
  const branchId = useAppSelector(selectSelectedBranch);
  const selectedSpecialty = useAppSelector(selectSelectedSpecialty);
  const selectedDoctor = useAppSelector(selectSelectedDoctor);
  const { t } = useTranslation();

  // When Global branch changed
  useEffect(() => {
    if (todayApp) {
      onChange(prev => ({
        ...prev,
        branch: branchId,
        specialty: selectedSpecialty,
        doctor: selectedDoctor,
      }));
    } else {
      onChange(prev => ({ ...prev, branch: branchId }));
    }
  }, [branchId, onChange, selectedSpecialty, selectedDoctor, todayApp]);

  const specialties = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue.branch)),
        R.propOr([], 'specialties')
      )(branches),
    [branches, formValue.branch]
  );

  const doctors = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue.specialty)),
        R.propOr([], 'doctors')
      )(specialties),
    [formValue.specialty, specialties]
  );

  return (
    <Form
      formValue={formValue}
      onChange={onChange}
      fluid
      className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${formClassName}`}
    >
      <div className="flex-1">
        <CRSelectInput
          name="branch"
          label={t('branch')}
          placeholder={t('select')}
          data={branches}
          block
          cleanable={!cleanable}
        />
      </div>
      <div className="flex-1">
        <CRSelectInput
          name="specialty"
          label={t('specialty')}
          placeholder={t('select')}
          block
          data={specialties}
          onChange={value => {
            if (value) {
              if (todayApp) {
                dispatch(setSelectedSpecialty(value));
                localStorage.setItem(SELECTED_SPECIALTY, value);
              } else {
                onChange({ ...formValue, specialty: value });
              }
            }
          }}
          onClean={() => {
            if (todayApp) {
              dispatch(setSelectedSpecialty(null));
              localStorage.removeItem(SELECTED_SPECIALTY);
            }
          }}
        />
      </div>
      <div className="flex-1">
        <CRSelectInput
          name="doctor"
          label={t('user')}
          block
          data={doctors}
          placeholder={t('select')}
          onChange={value => {
            if (value) {
              if (todayApp) {
                dispatch(setSelectedDoctor(value));
                localStorage.setItem(SELECTED_DOCTOR, value);
              } else {
                onChange({ ...formValue, doctor: value });
              }
            }
          }}
          onClean={() => {
            if (todayApp) {
              dispatch(setSelectedDoctor(null));
              localStorage.removeItem(SELECTED_DOCTOR);
            }
          }}
        />
      </div>
    </Form>
  );
}

export default AppointmentsFilter;
