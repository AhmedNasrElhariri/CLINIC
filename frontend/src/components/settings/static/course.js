import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewCourseDefinition from './new-course-definition';
import ListCoursesDefinition from './list-courses-definition';
import { useCoursesDefinition } from 'hooks';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';
import { useTranslation } from 'react-i18next';

const initValue = {
  name: '',
  type: '',
  price: 0,
  units: 0,
  messureOfUnits: '',
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Course name is required'),
  type: StringType().isRequired(' type is required'),
  price: NumberType().range(1, 1000000).isRequired('price is required'),
  units: NumberType().range(1, 1000000).isRequired('units is required'),
});

const CourseDefinition = () => {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useFrom({
    initValue,
    model,
  });
  const {
    addCourseDefinition,
    coursesDefinitions,
    editCourseDefinition,
    deleteCourseDefinition,
    loading,
  } = useCoursesDefinition({
    onCreate: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
    onDelete: () => {
      close();
      setShow(false);
      setFormValue(initValue);
    },
  });
  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const course = R.pick([
        'id',
        'name',
        'type',
        'price',
        'units',
        'messureOfUnits',
      ])(data);
      setType('edit');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const course = R.pick([
        'id',
        'name',
        'type',
        'price',
        'units',
        'messureOfUnits',
      ])(data);
      setType('delete');
      setFormValue(course);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addCourseDefinition({
        variables: {
          courseDefinition: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteCourseDefinition({
        variables: {
          courseDefinition: formValue,
          type: 'delete',
        },
      });
    } else {
      editCourseDefinition({
        variables: {
          courseDefinition: formValue,
          type: 'edit',
        },
      });
    }
  }, [
    addCourseDefinition,
    editCourseDefinition,
    deleteCourseDefinition,
    formValue,
    type,
  ]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          {t('addNewCourse')}+
        </CRButton>
      </Div>
      <NewCourseDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
        loading={loading}
      />
      <ListCoursesDefinition
        courses={coursesDefinitions}
        onEdit={handleClickEdit}
        onDelete={handleClickDelete}
      />
    </>
  );
};

export default CourseDefinition;
