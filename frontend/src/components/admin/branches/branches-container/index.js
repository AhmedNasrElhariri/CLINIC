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

export default function Branches() {
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
  const handleCreate = useCallback(
    branch => {
      createBranch(branch);
    },
    [createBranch]
  );
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
  useEffect(() => {
    if (branches.length > 0 && specialties.length > 0) {
      const branchId = branches[0]?.id;
      const specialtyId = specialties[0]?.id;
      setBranchIds([...branchIds, branchId]);
      setSpecialtyIds([...specialtyIds, specialtyId]);
    }
  }, [branches, specialties]);
  return (
    <>
      <MainContainer
        title={t('branches')}
        nobody
        more={
          <Div>
            <CRButton onClick={openBranch} variant="primary">
              {t('newBranch')}
            </CRButton>
            <CRButton onClick={openSpecialty} variant="primary" m="0px 2px">
              {t('addSpecialty')}
            </CRButton>
          </Div>
        }
      ></MainContainer>
      <NewBranch
        onCreate={handleCreate}
        show={branchVisible}
        onHide={closeBranch}
        onCancel={closeBranch}
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
      />
    </>
  );
}

Branches.propTypes = {};

Branches.defaultProps = {};
