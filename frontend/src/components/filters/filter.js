import React, { useEffect, useMemo } from 'react';
import { Form } from 'rsuite';
import { get } from 'services/local-storage';
import { CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
function AppointmentsFilter({ formValue, onChange, branches }) {
  const branch = get('branch');
  const { t } = useTranslation();
  useEffect(() => {
    onChange({ ...formValue, branch: branch });
  }, [branch]);
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
      className="grid grid-cols-2 sm:grid-cols-3 gap-4"
    >
      <div className="flex-1">
        <CRSelectInput
          name="branch"
          label={t('branch')}
          placeholder={t('select')}
          data={branches}
          block
        />
      </div>
      <div className="flex-1">
        <CRSelectInput
          name="specialty"
          label={t('specialty')}
          placeholder={t('select')}
          block
          data={specialties}
        />
      </div>
      <div className="flex-1">
        <CRSelectInput
          name="doctor"
          label={t('user')}
          block
          data={doctors}
          placeholder={t('select')}
        />
      </div>
      {/* <Div display="flex" width="100%" justifyContent="space-between"> */}
      {/* <Div width="32%"> */}

      {/* </Div> */}
      {/* <Div width="32%"> */}

      {/* </Div> */}
      {/* <Div width="32%"> */}

      {/* </Div> */}
      {/* </Div> */}
    </Form>
  );
}

export default AppointmentsFilter;
