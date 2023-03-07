import { useCallback, useState } from 'react';
import { Div, CRButton } from 'components';
import { useTranslation } from 'react-i18next';
import { useModal, useForm } from 'hooks';
import InventoryModel from './inventory-model';
const initialFromValue = {
  branchId: null,
  specialtyId: null,
  doctorId: null,
  item: null,
  quantity: 0,
};
const initialToValue = {
  branchId: null,
  specialtyId: null,
  doctorId: null,
};
const Transfer = () => {
  const { visible, close, open } = useModal({});
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();
  const { formValue: fromFormValue, setFormValue: fromSetFormValue } = useForm({
    initValue: initialFromValue,
  });
  const { formValue: toFormValue, setFormValue: toSetFormValue } = useForm({
    initValue: initialToValue,
  });
  (fromFormValue, '--', toFormValue);
  const handleTransferInventory = useCallback(() => {
    open();
  }, [open]);
  const handleCancel = useCallback(() => {
    close();
  }, [close]);
  const handleOk = useCallback(() => {
    if (activeStep !== 2) {
      setActiveStep(activeStep + 1);
    } else {
      transferInventoryItems({
        variables: {
          input: {
            id: fromFormValue.item?.id,
            itemId: fromFormValue.item?.item.id,
            quantity: fromFormValue.quantity,
            toBranchId: toFormValue.branchId,
            toSpecialtyId: toFormValue.specialtyId,
            toUserId: toFormValue.userId,
          },
        },
      });
    }
  }, [activeStep, transferInventoryItems]);

  return (
    <>
      <Div display="flex" justifyContent="right" mt={10}>
        <CRButton onClick={() => handleTransferInventory()}>
          {t('transfer')}
        </CRButton>
      </Div>
      <InventoryModel
        show={visible}
        t={t}
        handleCancel={handleCancel}
        handleOk={handleOk}
        fromFormValue={fromFormValue}
        fromSetFormValue={fromSetFormValue}
        toFormValue={toFormValue}
        toSetFormValue={toSetFormValue}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </>
  );
};
export default Transfer;
