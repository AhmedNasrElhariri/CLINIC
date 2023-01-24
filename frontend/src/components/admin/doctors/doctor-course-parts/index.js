import Filter from './filter';
import ListParts from './list-parts';
import NewPartToDoctor from './new-course-parts-to-doctor';
import { useDoctor, useModal, useCourseTypeDefinition } from 'hooks';
import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';
const initialValues = {
  doctorId: null,
  partId: null,
  feesCalculationType: null,
  fees: 0,
};
const DoctorCourseParts = () => {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const [type, setType] = useState('');
  const [filter, setFilter] = useState({
    doctorId: null,
  });
  const { t } = useTranslation();
  const { courseTypesDefinition } = useCourseTypeDefinition({});
  const {
    doctors,
    doctorCoursePartsDefinations,
    addCoursePartToDoctor,
    deleteCoursePartToDoctor,
  } = useDoctor({
    onCreateUser: close,
    onEditUser: close,
    onCreateCoursePartToDoctor: () => {
      close();
      setFormValue(initialValues);
    },
    doctorId: filter?.doctorId,
  });
  const handleClickAddCoursePartToDoctor = useCallback(() => {
    setType('newCoursePart');
    open();
  }, [open, setType]);
  const handleDeleteCoursePart = useCallback(
    data => {
      const partId = R.propOr('', 'id')(data);
      setType('delete');
      setFormValue({ partId: partId });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'newCoursePart') {
      addCoursePartToDoctor({ variables: { doctorCoursePart: formValue } });
    } else {
      deleteCoursePartToDoctor({ variables: { partId: formValue.partId } });
    }
  }, [addCoursePartToDoctor, deleteCoursePartToDoctor, formValue, type]);
  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        doctors={doctors}
        t={t}
        onAddPartToDoctor={handleClickAddCoursePartToDoctor}
      />
      <ListParts
        parts={doctorCoursePartsDefinations}
        onDeletePart={handleDeleteCoursePart}
        t={t}
      />
      <NewPartToDoctor
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
        courseParts={courseTypesDefinition}
        users={doctors}
        t={t}
      />
    </>
  );
};
export default DoctorCourseParts;
