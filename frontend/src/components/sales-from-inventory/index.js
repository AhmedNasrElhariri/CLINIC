import { CRButton, Div, MainContainer } from 'components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInventory, useModal, useForm } from 'hooks';
import { Schema } from 'rsuite';
import ConsumeUnits from './sale-item';
import ListData from './list-data';
const initInventoryValue = {
  itemId: null,
  quantity: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
  saleOption: 'saleByUnit',
  pricePerUnit: 0,
  numberOfBoxes: 0,
  pricePerBox: 0,
};
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});
const Sales = () => {
  const { t } = useTranslation();
  const { visible, close, open } = useModal({});

  const [selectedItems, setSelectedItems] = useState([]);
  const { formValue, setFormValue } = useForm({
    initValue: initInventoryValue,
    model,
  });
  const { consumeInventoryManual, history } = useInventory({
    onConsumeInventory: () => {
      close();
    },
    isSelling: true,
  });

  const handleSaleItem = useCallback(() => {
    open();
  }, [open]);

  return (
    <>
      <MainContainer
        title={t('sales')}
        more={
          <Div display="flex">
            <CRButton>{t('print')}</CRButton>
            <CRButton onClick={handleSaleItem} ml={10}>
              {t('sell')}
            </CRButton>
          </Div>
        }
        nobody
      ></MainContainer>
      <ListData data={history} t={t} />
      <ConsumeUnits
        setSelectedItems={setSelectedItems}
        close={close}
        selectedItems={selectedItems}
        formValue={formValue}
        visible={visible}
        consumeInventoryManual={consumeInventoryManual}
        t={t}
        setFormValue={setFormValue}
        isSelling
      />
    </>
  );
};
export default Sales;
