import { useMemo, useEffect, useState } from 'react';
import { CRSelectInput } from 'components';
import { Form } from 'rsuite';
import { useQuery } from '@apollo/client';
import { LIST_BRANCHES_TREE } from 'apollo-client/queries';
import useUserProfile from 'components/functional/root/fetch-user';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

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
  notAllowSpecialty,
  notAllowUser,
}) => {
  const [checkFormValue] = useState(intialCheckValue);
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
  const branchDoctors = useMemo(() => {
    return [
      ...new Map(
        branches
          .reduce(
            (acc, { specialties }) => [
              ...acc,
              ...specialties.reduce(
                (acc2, { doctors }) => [...acc2, ...doctors],
                []
              ),
            ],
            []
          )
          .map(item => [item.id, item])
      ).values(),
    ];
  }, [branches]);
  useEffect(() => {
    if (branches.length === 1 && checkFormValue.check.length === 0) {
      onChange(prev => ({
        ...prev,
        branchId: branches[0]?.id,
      }));
    }
  }, [branches, formValue?.branchId, checkFormValue, onChange]);
  useEffect(() => {
    if (specialties.length === 1 && !notAllowSpecialty) {
      onChange(prev => ({
        ...prev,
        specialtyId: specialties[0]?.id,
      }));
    }
  }, [specialties, formValue.branchId, onChange, notAllowSpecialty]);
  useEffect(() => {
    if (doctors.length === 1 && !notAllowUser) {
      onChange(prev => ({
        ...prev,
        userId: doctors[0]?.id,
      }));
    }
  }, [doctors, formValue.specialtyId, checkFormValue, onChange, notAllowUser]);
  useEffect(() => {
    if (
      checkFormValue.check.length !== 0 &&
      checkFormValue.check[0] === 'organization'
    ) {
      onChange(prev => ({
        ...prev,
        branchId: null,
        specialtyId: null,
        userId: null,
      }));
    }
    if (
      checkFormValue.check.length !== 0 &&
      checkFormValue.check[0] === 'mySelf'
    ) {
      onChange(prev => ({
        ...prev,
        branchId: null,
        specialtyId: null,
        userId: user.id,
      }));
    }
  }, [
    formValue.branchId,
    formValue.specialtyId,
    formValue.userId,
    checkFormValue.check,
    user.id,
    onChange,
  ]);
  return (
    <>
      {/* {showUserAndOrganization && (
        <Form formValue={checkFormValue} onChange={setCheckFormValue}>
          <CRCheckBoxGroup name="check" options={options} max={1} inline />
        </Form>
      )} */}

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
            {!notAllowSpecialty &&
              ((specialties.length > 1 && formValue.branchId) ||
                NotAutoHideNested) && (
                <CRSelectInput
                  label={t('specialty')}
                  name="specialtyId"
                  placeholder={t('select')}
                  block
                  data={specialties}
                />
              )}
            {!notAllowUser &&
              ((doctors.length > 1 && formValue.specialtyId) ||
                NotAutoHideNested) && (
                <CRSelectInput
                  label={t('user')}
                  name="userId"
                  placeholder={t('select')}
                  block
                  data={!notAllowUser ? branchDoctors : doctors}
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
  notAllowSpecialty = false,
  notAllowUser = false,
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
      notAllowSpecialty={notAllowSpecialty}
      notAllowUser={notAllowUser}
    />
  );
};

export default CRBranchTree;
