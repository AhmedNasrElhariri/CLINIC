import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import {
  CRNumberInput,
  CRSelectInput,
  CRSelectWithOrganization,
  CRBrancheTree,
  CRModal,
} from 'components/widgets';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const operationTypes = [
  { id: 'Add', name: 'Add' },
  { id: 'Subtract', name: 'Subtract' },
];

function ReconciliateSales({
  formValue,
  setFormValue,
  itemsChoices,
  reconcilateSales,
  visible,
  close,
}) {
  const { t } = useTranslation();

  const handleChangeBoxOrUnits = useCallback(
    (value, type) => {
      const numberOfBoxes =
        formValue?.itemId?.quantity / formValue?.itemId?.amount;
      type === 'noOfUnits'
        ? setFormValue({
            ...formValue,
            quantity: value,
            noOfBoxes: value / numberOfBoxes,
          })
        : setFormValue({
            ...formValue,
            noOfBoxes: value,
            quantity: value * numberOfBoxes,
          });
    },
    [setFormValue, formValue?.itemId] // don't change these dependencies
  );

  const handleOk = useCallback(() => {
    const { branchId, operation, quantity, itemId, noOfBoxes } = formValue;
    reconcilateSales({
      variables: {
        sales: {
          branchId,
          operation,
          numberOfUnits: quantity,
          itemId: itemId.id,
          noOfBoxes,
        },
      },
    });
  }, [formValue, reconcilateSales]);

  return (
    <CRModal
      show={visible}
      header={t('reconciliate')}
      onOk={handleOk}
      onHide={() => {
        close();
      }}
      onCancel={() => {
        close();
      }}
      width={850}
      height={480}
      bodyStyle={{ paddingLeft: 47, paddingRight: 47, margin: 0 }}
    >
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          name="operation"
          data={operationTypes}
          block
          label={t('operation')}
        />
        <CRBrancheTree
          formValue={formValue}
          onChange={setFormValue}
          action={ACTIONS.AddCustom_Inventory}
          notAllowSpecialty
          notAllowUser
        />
        <CRSelectWithOrganization
          label={t('item')}
          name="itemId"
          specialtyId={formValue?.specialtyId}
          branchId={formValue?.branchId}
          userId={formValue?.userId}
          data={itemsChoices}
          placement="auto"
          block
        ></CRSelectWithOrganization>
        <div className="flex items-end gap-3 mb-5">
          <CRNumberInput
            label={t('numberOfBoxes')}
            value={formValue.noOfBoxes}
            onChange={val => handleChangeBoxOrUnits(val, 'numberOfBoxes')}
            float
          />
          <CRNumberInput
            label={t('noOfUnits')}
            value={formValue.quantity}
            onChange={val => handleChangeBoxOrUnits(val, 'noOfUnits')}
          />
        </div>
      </Form>
    </CRModal>
  );
}

ReconciliateSales.defaultProps = {};

export default ReconciliateSales;
