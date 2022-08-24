import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  NewBranch,
  MainContainer,
  CRButton,
  ListBranches,
  AddSpecialty,
  Div,
} from 'components';
import { usePermissions, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

const initialValues = {
  name: '',
  address: '',
  phoneNo: '',
  notes: '',
};

export default function Branches() {
  const [formValue, setFormValue] = useState(initialValues);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const {
    visible: branchVisible,
    open: openBranch,
    close: closeBranch,
  } = useModal();
  const {
    visible: specialtyVisible,
    open: openSpecialty,
    close: closeSpecialty,
  } = useModal();
  const { branches, specialties, createBranch, addSpecialty } = usePermissions({
    onCreateBranch: closeBranch,
    onAddSpecialty: closeSpecialty,
  });
  const [branchIds, setBranchIds] = useState([]);
  const [specialtyIds, setSpecialtyIds] = useState([]);
  const { t } = useTranslation();
  const handleAdd = useCallback(() => {
    if (type === 'createBranch') {
      createBranch({ type: 'create', ...formValue });
    } else if (type === 'editBranch') {
      createBranch({ type: 'edit', ...formValue });
    }
  }, [createBranch, type, formValue]);
  const handleAddSpecialty = useCallback(
    value => addSpecialty(value),
    [addSpecialty]
  );
  const onSpecilatyClick = useCallback(
    (branchId, specialtyId) => {
      setBranchIds([...branchIds, branchId]);
      setSpecialtyIds([...specialtyIds, specialtyId]);
    },
    [branchIds, specialtyIds]
  );
  const handleClickEdit = useCallback(
    data => {
      const user = R.pick(['id', 'name', 'email', 'allowedViews'])(data);
      setType('editBranch');
      setHeader(t('editBranch'));
      setFormValue(user);
      openBranch();
    },
    [openBranch, setFormValue, setType, setHeader]
  );
  const handleCreateBranch = useCallback(
    data => {
      setType('createBranch');
      setHeader(t('newBranch'));
      openBranch();
    },
    [openBranch, setFormValue, setType, setHeader]
  );
  useEffect(() => {
    if (branches.length > 0 && specialties.length > 0) {
      const branchId = branches[0]?.id;
      const specialtyId = specialties[0]?.id;
      setBranchIds([...branchIds, branchId]);
      setSpecialtyIds([...specialtyIds, specialtyId]);
    }
  }, [branches, specialties]);
  console.log(formValue, 'F');
  return (
    <>
      <MainContainer
        title={t('branches')}
        nobody
        more={
          <Div>
            <CRButton onClick={handleCreateBranch} variant="primary">
              {t('newBranch')}
            </CRButton>
            <CRButton onClick={openSpecialty} variant="primary" m="0px 2px">
              {t('addSpecialty')}
            </CRButton>
          </Div>
        }
      ></MainContainer>
      <NewBranch
        handleAdd={handleAdd}
        show={branchVisible}
        onHide={closeBranch}
        onCancel={closeBranch}
        formValue={formValue}
        setFormValue={setFormValue}
        header={header}
      />
      <AddSpecialty
        onAdd={handleAddSpecialty}
        show={specialtyVisible}
        onHide={closeSpecialty}
        onCancel={closeSpecialty}
        branches={branches}
        specialties={specialties}
      />
      <ListBranches
        branches={branches}
        onSpecilatyClick={onSpecilatyClick}
        branchIds={branchIds}
        specialtyIds={specialtyIds}
        onEdit={handleClickEdit}
      />
    </>
  );
}

Branches.propTypes = {};

Branches.defaultProps = {};
