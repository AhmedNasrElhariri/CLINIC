import React, { useMemo, useEffect, useState } from 'react';
import { CRSelectInput, CRCheckBoxGroup } from 'components';
import { Form } from 'rsuite';
import { useQuery } from '@apollo/client';
import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import useUserProfile from 'components/functional/root/fetch-user';
import * as R from 'ramda';
const options = [
  { name: 'Organization', value: 'organization' },
  { name: 'My Self', value: 'mySelf' },
];
const intialCheckValue = {
  check: [],
};
const CustomBranchTress = ({ onChange, formValue, action  }) => {
  const [checkFormValue, setCheckFormValue] = useState(intialCheckValue);
  const { data } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: action },
  });
  const branches = useMemo(() => R.propOr([], 'listBranchesTree')(data),[data,action]);
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
    if (branches.length == 1 && checkFormValue.check.length == 0) {
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
  }, [doctors, formValue?.specialtyId, checkFormValue]);
  useEffect(() => {
    if (
      checkFormValue.check.length != 0 &&
      checkFormValue.check[0] === 'organization'
    ) {
      onChange({
        ...formValue,
        branchId: null,
        specialtyId: null,
      });
    }
    if (
      checkFormValue.check.length != 0 &&
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
      <Form formValue={checkFormValue} onChange={setCheckFormValue}>
        <CRCheckBoxGroup name="check" options={options} max={1} inline />
      </Form>
      <Form formValue={formValue} onChange={onChange}>
        {checkFormValue.check.length == 0 && (
          <>
            {branches.length > 1 && (
              <CRSelectInput
                label="Branch"
                name="branchId"
                placeholder="Select Branch"
                block
                data={branches}
              />
            )}
            {specialties.length > 1 && formValue.branchId && (
              <CRSelectInput
                label="Specialty"
                name="specialtyId"
                placeholder="Select Specialty"
                block
                data={specialties}
              />
            )}
            {doctors.length > 1 && formValue.specialtyId && (
              <CRSelectInput
                label="Doctor"
                name="userId"
                placeholder="Select Doctor"
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

const CRBranchTree = ({ formValue, onChange, action }) => {
  return <CustomBranchTress formValue={formValue} onChange={onChange} action={action}/>;
};

export default CRBranchTree;
