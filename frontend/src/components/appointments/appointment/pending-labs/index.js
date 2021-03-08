import React,{useCallback} from 'react';
import ListLabDocs from './list-labs';
import UpdateLab from './edit-lab';

import * as R from 'ramda';
import useFrom from 'hooks/form';

import useModal from 'hooks/use-model';
// import useFetchLabDocs from 'hooks/fetch-lab-docs';

let labDocs = [
  {
    id: '1',
    name: 'lab1',
    date: '22-10-2020',
    value: '',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '12-1',
    results: 'view Image',
  },
  {
    id: '2',
    name: 'lab2',
    date: '22-10-2020',
    value: '12-1',
    results: 'view Image',
  },
];
const initValue = { name: '' ,value:'',results:''};
const PendingLabs = ({ patient,patientLabDocs }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const handleClickEdit = useCallback(
    data => {
      const lab = R.pick(['id', 'name','value','results'])(data);
      setType('edit');
      setFormValue(lab);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    // if (type === 'create') {
    //   addTestDefinition({
    //     variables: {
    //       testDefinition: formValue,
    //     },
    //   });
    // } else {
    //   editTestDefinition({
    //     variables: {
    //       testDefinition: formValue,
    //     },
    //   });
    // }
  }, []);
  return (
    <>
      <ListLabDocs labs={patientLabDocs} onEdit={handleClickEdit} />
      <UpdateLab
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      {/* <AddLabDocs
        show={visible}
        onCancel={() => setVisible(false)}
        onAdded={newDoc => {
          setVisible(false);
          updateCache([newDoc, ...labDocs]);
        }}
        patient={patient}
        labs={labDocs}
      /> */}
    </>
  );
};

PendingLabs.propTypes = {};

export default PendingLabs;
