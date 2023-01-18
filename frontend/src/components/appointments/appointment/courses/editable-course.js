import { useEffect, useMemo } from 'react';
import {
  Sessions,
  CRButton,
  CRSelectInput,
  CRNumberInput,
  CRBrancheTree,
  CRModal,
} from 'components';
import { useBankDefinition, useCourseTypeDefinition } from 'hooks';
import { ACTIONS } from 'utils/constants';
import { Form } from 'rsuite';

function EditableCourse({
  visible,
  onClose,
  onOk,
  formValue,
  header,
  onChange,
  loading,
  bank,
  setBank,
  visa,
  setVisa,
  paidSessions,
  setPaidSessions,
  t,
  courseParts,
}) {
  // const { courseTypesDefinition } = useCourseTypeDefinition({});
  const { banksDefinition } = useBankDefinition({});
  const choices = useMemo(() => {
    const newParts = courseParts.map(cp => {
      const val = {
        id: cp.id,
        name: cp.part.name,
        price: cp.unitPrice,
        partID: cp.part.id,
      };
      return { id: val, name: cp.part.name };
    });
    return newParts;
  }, [courseParts]);
  useEffect(() => {
    const sum = paidSessions.reduce(
      (sum, { price, number }) => sum + number * price,
      0
    );
    onChange({ ...formValue, paid: sum });
  }, [paidSessions, onChange]);
  return (
    <CRModal
      show={visible}
      header={header}
      onHide={onClose}
      onOk={onOk}
      loading={loading}
    >
      <Sessions
        t={t}
        selectedSessions={paidSessions}
        setSelectedSessions={setPaidSessions}
        sessions={choices}
      />
      <Form fluid formValue={formValue} onChange={onChange}>
        <CRButton
          onClick={() => {
            setVisa(true);
          }}
          mr={10}
        >
          {t('payByVisa')}
        </CRButton>
        {visa && (
          <Form>
            <CRSelectInput
              label={t('bank')}
              name="bank"
              data={banksDefinition}
              value={bank}
              onChange={setBank}
              placeholder={t('select')}
              style={{ width: '230px' }}
            />
          </Form>
        )}
        <CRNumberInput label={t('cashPayment')} name="paid" title="Paid" />
        {bank != null && (
          <CRNumberInput
            label={t('bankPayment')}
            name="visaPaid"
            value={formValue.visaPaid}
            title="visaPaid"
          />
        )}
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.ViewCourses_Patient}
        />
      </Form>
    </CRModal>
  );
}

export default EditableCourse;
