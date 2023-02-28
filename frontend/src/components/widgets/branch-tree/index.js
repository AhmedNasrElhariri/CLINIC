import React, { useMemo, useEffect, useState } from 'react';
import { CRSelectInput, CRCheckBoxGroup } from 'components';
import { Form } from 'rsuite';
import { useQuery } from '@apollo/client';
import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import useUserProfile from 'components/functional/root/fetch-user';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
const options = [
  { name: 'Organization', value: 'organization' },
  { name: 'My Self', value: 'mySelf' },
];
const intialCheckValue = {
  check: [],
};
const CustomBranchTress = ({
  onChange,
  formValue,
  action,
  showUserAndOrganization,
  NotAutoHideNested,
  t,
}) => {
  const [checkFormValue, setCheckFormValue] = useState(intialCheckValue);
  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: action },
  });
  const branches = useMemo(
    () => R.propOr([], 'listBranchesTree')(data),
    [data]
  );
  const { user } = useUserProfile();
  const specialties = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue?.branchId)),
        R.propOr([], 'specialties')
      )(branches),
    [formValue?.branchId, branches]
  );
  const doctors = useMemo(
    () =>
      R.pipe(
        R.find(R.propEq('id', formValue?.specialtyId)),
        R.propOr([], 'doctors')
      )(specialties),
    [formValue?.specialtyId, specialties]
  );
  useEffect(() => {
    if (branches.length === 1 && checkFormValue.check.length === 0) {
      onChange({
        ...formValue,
        branchId: branches[0]?.id,
      });
    }
  }, [branches, formValue?.branchId, checkFormValue]);
  useEffect(() => {
    if (specialties.length == 1) {
      onChange({
        ...formValue,
        specialtyId: specialties[0]?.id,
      });
    }
  }, [specialties, formValue.branchId]);
  useEffect(() => {
    if (doctors.length == 1) {
      onChange({
        ...formValue,
        userId: doctors[0]?.id,
      });
    }
  }, [doctors, formValue.specialtyId, checkFormValue]);
  useEffect(() => {
    if (
      checkFormValue.check.length !== 0 &&
      checkFormValue.check[0] === 'organization'
    ) {
      onChange({
        ...formValue,
        branchId: null,
        specialtyId: null,
        userId: null,
      });
    }
    if (
      checkFormValue.check.length !== 0 &&
      checkFormValue.check[0] === 'mySelf'
    ) {
      onChange({
        ...formValue,
        branchId: null,
        specialtyId: null,
        userId: user.id,
      });
    }
  }, [
    formValue.branchId,
    formValue.specialtyId,
    formValue.userId,
    checkFormValue.check,
  ]);
  return (
    <>
      {showUserAndOrganization && (
        <Form formValue={checkFormValue} onChange={setCheckFormValue}>
          <CRCheckBoxGroup name="check" options={options} max={1} inline />
        </Form>
      )}

      <Form formValue={formValue} onChange={onChange}>
        {checkFormValue.check.length === 0 && (
          <>
            {(branches.length > 1 || NotAutoHideNested) && (
              <CRSelectInput
                label={t('branch')}
                name="branchId"
                placeholder={t('select')}
                block
                data={branches}
              />
            )}
            {((specialties.length > 1 && formValue.branchId) ||
              NotAutoHideNested) && (
              <CRSelectInput
                label={t('specialty')}
                name="specialtyId"
                placeholder={t('select')}
                block
                data={specialties}
              />
            )}
            {((doctors.length > 1 && formValue.specialtyId) ||
              NotAutoHideNested) && (
              <CRSelectInput
                label={t('user')}
                name="userId"
                placeholder={t('select')}
                block
                data={doctors}
              />
            )}
          </>
        )}
      </Form>
    </>
  );
};

const CRBranchTree = ({
  formValue,
  onChange,
  action,
  showUserAndOrganization = true,
  NotAutoHideNested = true,
}) => {
  const { t } = useTranslation();
  return (
    <CustomBranchTress
      formValue={formValue}
      onChange={onChange}
      action={action}
      showUserAndOrganization={showUserAndOrganization}
      NotAutoHideNested={NotAutoHideNested}
      t={t}
    />
  );
};

export default CRBranchTree;
