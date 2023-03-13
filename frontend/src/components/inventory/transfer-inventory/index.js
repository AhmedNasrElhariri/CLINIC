import { useCallback, useState } from 'react';
import { Div, CRButton } from 'components';
import { useTranslation } from 'react-i18next';
import { useModal, useForm, useInventory } from 'hooks';
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
  userId: null,
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
  const { transferInventoryItem } = useInventory({
    onTransferInventory: () => {
      close();
      fromSetFormValue(initialFromValue);
      toSetFormValue(initialToValue);
    },
  });
  const handleTransferInventory = useCallback(() => {
    open();
  }, [open]);
  const handleCancel = useCallback(() => {
    close();
  }, [close]);
  console.log(fromFormValue, toFormValue);
  const handleOk = useCallback(() => {
    if (activeStep !== 1) {
      setActiveStep(activeStep + 1);
    } else {
      const { item, quantity } = fromFormValue;
      const { branchId, specialtyId, userId } = toFormValue;
      transferInventoryItem({
        variables: {
          input: {
            id: item?.id,
            itemId: item?.item.id,
            quantity: quantity,
            toBranchId: branchId,
            toSpecialtyId: specialtyId,
            toUserId: userId,
          },
        },
      });
    }
  }, [activeStep, fromFormValue, toFormValue, transferInventoryItem]);

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
