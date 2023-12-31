import { useCallback } from 'react';
import * as R from 'ramda';
import Filter from '../../filters';
import { Div, CRButton } from 'components';
import ListSurgeries from './list-surgeries';
import NewSurgery from './new-surgery';
import { Can } from 'components/user/can';
import { ACTIONS } from 'utils/constants';
import { useForm, useModal, useSurgeries, useBranchTree } from 'hooks';
import { Validate } from 'services/form';
import { Schema } from 'rsuite';
import { useTranslation } from 'react-i18next';

const initValue = { name: '', branchId: null, specialtyId: null, userId: null };
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('surgery name is required'),
});
function Surgeries() {
  const { visible, open, close } = useModal();
  const { t } = useTranslation();

  const { filterBranches } = useBranchTree({ action: ACTIONS.Create_Surgery });
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
  const { defineSurgery, editSurgery, surgeries, deleteSurgery } = useSurgeries(
    {
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
    }
  );

  const handleonClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const surgery = R.pick(['id', 'name'])(data);
      setType('edit');
      setFormValue(surgery);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleClickDelete = useCallback(
    data => {
      const surgery = R.pick(['id', 'name'])(data);
      setType('delete');
      setFormValue(surgery);
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'create' && Validate(model, formValue)) {
      defineSurgery({
        variables: {
          surgery: formValue,
        },
      });
    } else if (type === 'delete') {
      deleteSurgery({
        variables: {
          surgery: formValue,
          type: 'delete',
        },
      });
    } else {
      editSurgery({
        variables: {
          surgery: formValue,
          type: 'edit',
        },
      });
    }
  }, [defineSurgery, editSurgery, deleteSurgery, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <Can I="Create" a="Surgery">
          <CRButton variant="primary" onClick={handleonClickCreate}>
            {t('surgery')} +
          </CRButton>
        </Can>
      </Div>
      <NewSurgery
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
        type={type}
      />
      <Filter
        appointments={surgeries}
        branches={filterBranches}
        render={surgs => (
          <ListSurgeries
            surgeries={surgs}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
          />
        )}
      />
    </>
  );
}

export default Surgeries;
