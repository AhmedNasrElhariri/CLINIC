import { useCallback, useState } from 'react';
import { Div, CRButton } from 'components';
import { useTranslation } from 'react-i18next';
import { useModal, useForm, useInventory } from 'hooks';
import InventoryModel from './inventory-model';
import { Nav } from 'rsuite';
import ListPendingUserItems from './list-pending-items';
import ActionModel from './action-model';
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
  const [activeTab, setActiveTab] = useState(0);
  const [header, setHeader] = useState('');
  const [type, setType] = useState('');
  const [clickOnItemAction, setClickOnItemAction] = useState({
    id: null,
    fromInventoryItemId: null,
    type: '',
  });

  const { t } = useTranslation();
  const { formValue: fromFormValue, setFormValue: fromSetFormValue } = useForm({
    initValue: initialFromValue,
  });
  const { formValue: toFormValue, setFormValue: toSetFormValue } = useForm({
    initValue: initialToValue,
  });
  const { transferInventoryItem, pendingConsumptionItems } = useInventory({
    onTransferInventory: () => {
      close();
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
  }, [close]);
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
      <Nav
        activeKey={activeTab}
        onSelect={setActiveTab}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
      >
        <Nav.Item eventKey={0}>{t('pendingItems')}</Nav.Item>
      </Nav>
      {activeTab === 0 && (
        <ListPendingUserItems
          items={pendingConsumptionItems}
          onGetAction={handleAcceptOrRejectPendingItems}
        />
      )}
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
        />
      )}
      {type === 'acceptOrReject' && (
        <ActionModel
          show={visible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          header={header}
          close={close}
        />
      )}
    </>
  );
};
export default Transfer;
