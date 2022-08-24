import React, { useCallback, useState, useEffect } from 'react';

import {
  NewSpecialty,
  MainContainer,
  CRButton,
  ListSpecialties,
  AddDoctor,
  Div,
} from 'components';
import { usePermissions, useModal } from 'hooks';
import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

const initialValues = {
  name: '',
};

export default function SpecialtiesContainer() {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const { t } = useTranslation();
  const {
    visible: userVisible,
    open: openUser,
    close: closeDoctor,
  } = useModal();

  const { branches, specialties, doctors, createSpecialty, addDoctor } =
    usePermissions({
      onCreateSpecialty: close,
      onAddDoctor: closeDoctor,
    });
  const [branchIds, setBranchIds] = useState([]);
  const [specialtyIds, setSpecialtyIds] = useState([]);
  
  const handleAdd = useCallback(() => {
    if (type === 'createSpecialty') {
      createSpecialty({ type: 'create', ...formValue });
    } else if (type === 'editSpecialty') {
      createSpecialty({ type: 'edit', ...formValue });
    }
  }, [createSpecialty, type, formValue]);
  const handleAddDoctor = useCallback(
    specialty => {
      addDoctor(specialty);
    },
    [addDoctor]
  );
  const onBranchClick = useCallback(
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
  const handleClickEdit = useCallback(
    data => {
      const specialty = R.pick(['id', 'name'])(data);
      setType('editSpecialty');
      setHeader(t('editSpecialty'));
      setFormValue(specialty);
      open();
    },
    [open, setFormValue, setType, setHeader]
  );
  const handleCreateSpecialty = useCallback(
    data => {
      setType('createSpecialty');
      setHeader(t('newSpecialty'));
      open();
    },
    [open, setFormValue, setType, setHeader]
  );
  console.log(specialties,'SSSpec');
  return (
    <>
      <MainContainer
        title={t('specialties')}
        nobody
        more={
          <Div>
            <CRButton onClick={handleCreateSpecialty} variant="primary">
              {t('newSpecialty')}
            </CRButton>
            <CRButton onClick={openUser} variant="primary" m="0px 2px">
              {t('addDoctor')}
            </CRButton>
          </Div>
        }
      ></MainContainer>
      <NewSpecialty
        onCreate={handleAdd}
        show={visible}
        onHide={close}
        onCancel={close}
        formValue={formValue}
        setFormValue={setFormValue}
        header={header}
      />
      <AddDoctor
        onCreate={handleAddDoctor}
        show={userVisible}
        onHide={closeDoctor}
        onCancel={closeDoctor}
        specialties={specialties}
        doctors={doctors}
      />
      <ListSpecialties
        specialties={specialties}
        branches={branches}
        onBranchClick={onBranchClick}
        branchIds={branchIds}
        specialtyIds={specialtyIds}
        onEdit={handleClickEdit}
      />
    </>
  );
}

SpecialtiesContainer.propTypes = {};

SpecialtiesContainer.defaultProps = {};
