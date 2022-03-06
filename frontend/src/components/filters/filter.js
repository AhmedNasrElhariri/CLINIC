import React, { useEffect, useMemo } from 'react';
import { Form, Row, Col } from 'rsuite';
import { get } from 'services/local-storage';
import { CRSelectInput } from 'components';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
function AppointmentsFilter({ formValue, onChange, branches }) {
  const { t } = useTranslation();
  useEffect(() => {
    onChange({ ...formValue, branch: get('branch') });
  }, [get('branch')]);
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
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="specialty"
            label={t('specialty')}
            block
            data={specialties}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="branch"
            label={t('branch')}
            data={branches}
            block
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput name="doctor" label={t('user')} block data={doctors} />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
