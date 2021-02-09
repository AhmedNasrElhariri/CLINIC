import React, { useCallback } from 'react';
import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import NewAssign from './new-assign';
import ListAssigns from './list-assign';
import usersPermission from 'hooks/use-permissions';
const initValue = { name: '' };

function Assign(){
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { users, fetchRoles } = usersPermission();
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);


  const handleAdd = useCallback(() => {
    
  }, );

  return (
    <>
      <Div textAlign="right">
        <CRButton primary small onClick={handleClickCreate}>
          Assign
        </CRButton>
      </Div>
      <NewAssign
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        users={users}
        fetchRoles={fetchRoles}
      />
      <ListAssigns data={fetchRoles}/>
      
    </>
  );
};

export default Assign;
