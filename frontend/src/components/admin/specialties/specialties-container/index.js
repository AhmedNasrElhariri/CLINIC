import React, { useCallback } from 'react';

import {
  NewSpecialty,
  MainContainer,
  CRButton,
  ListSpecialties,
  AddDoctor,
  Div,
} from 'components';
import usePermissions from 'hooks/use-permissions';
import useModal from 'hooks/use-model';

export default function SpecialtiesContainer() {
  const { visible, open, close } = useModal();
  const {
    visible: userVisible,
    open: openUser,
    close: closeDoctor,
  } = useModal();

  const {
    branches,
    specialties,
    doctors,
    createSpecialty,
    addDoctor,
  } = usePermissions({
    onCreateSpecialty: close,
    onAddDoctor: closeDoctor,
  });

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

  return (
    <>
      <MainContainer
        title="Specialties"
        nobody
        more={
          <Div>
            <CRButton onClick={open} primary small>
              New Specialty
            </CRButton>
            <CRButton onClick={openUser} primary small ml={2}>
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
      <ListSpecialties specialties={specialties} branches={branches} />
    </>
  );
}

SpecialtiesContainer.propTypes = {};

SpecialtiesContainer.defaultProps = {};
