import React, { useCallback,useMemo,useState } from 'react';
import Face from './face';
import { useModal, useForm,useFaceOperation } from 'hooks';
import { formatDate } from 'utils/date';
import { CRButton,Div } from 'components';
import NewFaceOperation from './new-face-operation';
import ListFaceOperations from './list-face-operations';
import Filter from './filter';
import * as R from 'ramda';

const initValue = {
  facePartationNumber: 0,
  facePartationName:'',
  units:'',
  materialId: null,
};
const filterInialValues = {
  name:'',
};
const FaceOperations = ({ patient }) => {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const [filter,setFilter] = useState(filterInialValues);
  const [operationsType,setOperationsType] = useState('all');
  const { addFaceOperation, deleteFaceOperation,partationFaceOperations, faceOperations } =
    useFaceOperation({
      patientId: patient?.id,
      facePartationNumber:formValue?.facePartationNumber,
      onCreate: () => {
        close();
        setFormValue(initValue);
      },
      onDelete: () => {
        close();
        setFormValue(initValue);
      },
    });
  const handleAddFaceOperation = useCallback(
    data => {
      const facePartationNumber = R.propOr(1, 'facePartationNumber')(data);
      const facePartationName = R.propOr(1, 'facePartationName')(data);
      setType('create');
      setFormValue({
        ...formValue,
        facePartationNumber: facePartationNumber,
        facePartationName:facePartationName,
      });
      setOperationsType('');
      open();
    },
    [open, setFormValue, setType]
  );
  const selectedOperations = useMemo(() => {
      if(operationsType === 'all'){
        return faceOperations;
      }
      else{
        return partationFaceOperations;
      }
  },[faceOperations,partationFaceOperations,operationsType]);
    const handleDelete = useCallback(
      data => {
        const id = R.propOr(null, 'id')(data);
        setType('delete');
        setFormValue({
          ...formValue,
          id: id,
        });
        open();
      },
      [open, setFormValue, setType]
    );
    const handleAdd = useCallback(() => {
      if (type === 'create') {
        const updatedFormValue = {
          facePartationNumber:formValue.facePartationNumber,
          materialId:formValue.materialId,
          patientId: patient?.id,
          units:formValue.units,
          facePartationName:formValue.facePartationName,
        };
        addFaceOperation({
          variables: {
            faceOperation: updatedFormValue,
          },
        });
      }
      if (type === 'delete') {
        deleteFaceOperation({
          variables: {
            id: formValue.id,
          },
        });
      }
    }, [type, formValue, addFaceOperation,deleteFaceOperation]);
    const filteredOperations = useMemo(() => {
         return selectedOperations.filter(o => 
         o.facePartation.name.includes(filter.name) || formatDate(o.date).includes(filter.name)
         );
    },[filter,selectedOperations]);
  return (
    <>
      <Div display="flex" justifyContent="space-between">
          <Face onAddFaceOperation={handleAddFaceOperation} />
          <CRButton primary onClick={() => {setOperationsType('all')}}>Get All Operations</CRButton>
      </Div>
      <NewFaceOperation
        visible={visible}
        formValue={formValue}
        type={type}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
      <Filter formValue={filter} setFormValue={setFilter}/>
      <ListFaceOperations operations={filteredOperations} onDelete={handleDelete}/>
    </>
  );
};

export default FaceOperations;
