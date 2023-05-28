import { useCallback, useState } from 'react';
import { Div, CRButton } from 'components';
import { useTranslation } from 'react-i18next';
import { useModal, useForm, useInventory } from 'hooks';
import InventoryModel from './inventory-model';
import ListPendingUserItems from './list-pending-items';
import ActionModel from './action-model';
import { Schema } from 'rsuite';
const initialFromValue = {
  branchId: null,
  specialtyId: null,
  doctorId: null,
  item: null,
  quantity: 0,
  noOfBoxes: 0,
};
const initialToValue = {
  branchId: null,
  specialtyId: null,
  userId: null,
};

const model = Schema.Model({
  branchId: Schema.Types.StringType().isRequired('This field is required.'),
  userId: Schema.Types.StringType().isRequired('This field is required.'),
});

const Transfer = () => {
  const { t } = useTranslation();
  const { visible, close, open } = useModal({});
  const [activeStep, setActiveStep] = useState(0);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const [clickOnItemAction, setClickOnItemAction] = useState({
    id: null,
    fromInventoryItemId: null,
    type: '',
  });
  const { formValue: fromFormValue, setFormValue: fromSetFormValue } = useForm({
    initValue: initialFromValue,
  });
  const {
    formValue: toFormValue,
    setFormValue: toSetFormValue,
    checkResult,
    validate,
    show: showError,
    setShow: setShowError,
  } = useForm({
    initValue: initialToValue,
    model: model,
  });
  const { transferInventoryItem, pendingConsumptionItems, transferAction } =
    useInventory({
      onTransferInventory: () => {
        close();
        setShowError(false);
        setActiveStep(0);
        fromSetFormValue(initialFromValue);
        toSetFormValue(initialToValue);
      },
    });
  const handleTransferInventory = useCallback(() => {
    open();
    setHeader(t('transferMedicineOrItem'));
    setType('transfer');
  }, [open, t, setType]);
  const handleCancel = useCallback(() => {
    close();
    setActiveStep(0);
    fromSetFormValue(initialFromValue);
    toSetFormValue(initialToValue);
  }, [close]);
  const handleOk = useCallback(() => {
    if (type === 'transfer') {
      if (activeStep !== 1) {
        setActiveStep(activeStep + 1);
      } else {
        const { item, quantity, noOfBoxes } = fromFormValue;
        const { branchId, specialtyId, userId } = toFormValue;
        transferInventoryItem({
          variables: {
            input: {
              id: item?.id,
              itemId: item?.item.id,
              quantity: quantity,
              noOfBoxes: noOfBoxes,
              toBranchId: branchId,
              toSpecialtyId: specialtyId,
              toUserId: userId,
            },
          },
        });
      }
    } else {
      transferAction({ variables: clickOnItemAction });
    }
  }, [
    activeStep,
    fromFormValue,
    toFormValue,
    transferInventoryItem,
    transferAction,
    clickOnItemAction,
    type,
  ]);
  const handleAcceptOrRejectPendingItems = useCallback(
    ({ id, fromInventoryItemId }, type) => {
      setHeader(`${type} Item`);
      setType('acceptOrReject');
      open();
      setClickOnItemAction({
        id: id,
        fromInventoryItemId: fromInventoryItemId,
        type: type,
      });
    },
    [open, setHeader, setClickOnItemAction]
  );
  return (
    <>
      <Div display="flex" justifyContent="right" mt={10}>
        <CRButton onClick={() => handleTransferInventory()}>
          {t('transfer')}
        </CRButton>
      </Div>
      <h1 className="text-2xl mb-4 mt-5">{t('pendingItems')}</h1>
      <ListPendingUserItems
        items={pendingConsumptionItems}
        onGetAction={handleAcceptOrRejectPendingItems}
        t={t}
      />
      {type === 'transfer' && (
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
          header={header}
          showError={showError}
          setShowError={setShowError}
          validate={validate}
          checkResult={checkResult}
        />
      )}
      {type === 'acceptOrReject' && (
        <ActionModel
          show={visible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          header={header}
          close={close}
          t={t}
        />
      )}
    </>
  );
};
export default Transfer;
