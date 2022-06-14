import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Div, CRButton } from 'components';
import NewCourseTypeDefinition from './new-course-type-definition';
import ListCourseTypesDefinition from './list-course-type-definition';
import { useForm, useCourseTypeDefinition } from 'hooks';
import { Can } from 'components/user/can';
import { useModal } from 'hooks';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = {
  name: '',
  price: 0,
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('CourseType name is required'),
  price: NumberType().isRequired('price is required'),
});

const CourseTypeDefinition = () => {
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
  } = useForm({
    initValue,
    model,
  });
  const {
    addCourseTypeDefinition,
    courseTypesDefinition,
    editCourseTypeDefinition,
    loading,
  } = useCourseTypeDefinition({
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
  });

  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);
  const handleClickEdit = useCallback(
    data => {
      const courseType = R.pick(['id', 'name', 'price'])(data);
      setType('edit');
      setFormValue(courseType);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create') {
      addCourseTypeDefinition({
        variables: {
          courseTypeDefinition: {
            ...formValue,
            price: parseFloat(formValue.price),
          },
        },
      });
    } else {
      editCourseTypeDefinition({
        variables: {
          courseTypeDefinition: {
            ...formValue,
            price: parseFloat(formValue.price),
          },
        },
      });
    }
  }, [addCourseTypeDefinition, editCourseTypeDefinition, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <Can I="Create" an="SessionDefinition">
          <CRButton variant="primary" onClick={handleClickCreate} mt={2}>
            {t('addNewCourseType')}+
          </CRButton>
        </Can>
      </Div>
      <NewCourseTypeDefinition
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
      <ListCourseTypesDefinition
        courseTypes={courseTypesDefinition}
        onEdit={handleClickEdit}
      />
    </>
  );
};

export default CourseTypeDefinition;
