import React, { useCallback } from 'react';
import * as R from 'ramda';

import { Div, CRButton } from 'components';
import useFrom from 'hooks/form';
import NewCourseDefinition from './new-course-definition';
import ListCoursesDefinition from './list-courses-definition';
import { useCoursesDefinition } from 'hooks';
import { Validate } from 'services/form';
import { Schema } from 'rsuite';
import { useModal } from 'hooks';

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
  const { formValue, setFormValue, type, setType } = useFrom({
    initValue,
  });
  const { addCourseDefinition, coursesDefinitions, editCourseDefinition } =
    useCoursesDefinition({
      onCreate: () => {
        close();
        setFormValue(initValue);
      },
      onEdit: () => {
        close();
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

  const handleAdd = useCallback(() => {
    if (type === 'create' && Validate(model, formValue)) {
      addCourseDefinition({
        variables: {
          courseDefinition: formValue,
        },
      });
    } else if (type === 'edit' && Validate(model, formValue)) {
      editCourseDefinition({
        variables: {
          courseDefinition: formValue,
        },
      });
    }
  }, [addCourseDefinition, editCourseDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
          Add New Course+
        </CRButton>
      </Div>
      <NewCourseDefinition
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        type={type}
      />
      <ListCoursesDefinition
        courses={coursesDefinitions}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default CourseDefinition;
