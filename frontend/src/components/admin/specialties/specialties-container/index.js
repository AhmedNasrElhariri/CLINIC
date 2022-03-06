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

export default function SpecialtiesContainer() {
  const { visible, open, close } = useModal();
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
  const handleCreate = useCallback(
    specialty => {
      createSpecialty(specialty);
    },
    [createSpecialty]
  );

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
  return (
    <>
      <MainContainer
        title="Specialties"
        nobody
        more={
          <Div>
            <CRButton onClick={open} variant="primary">
              New Specialty
            </CRButton>
            <CRButton onClick={openUser} variant="primary" m="0px 2px">
              Add Doctor
            </CRButton>
          </Div>
        }
      ></MainContainer>
      <NewSpecialty
        onCreate={handleCreate}
        show={visible}
        onHide={close}
        onCancel={close}
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
      />
    </>
  );
}

SpecialtiesContainer.propTypes = {};

SpecialtiesContainer.defaultProps = {};
