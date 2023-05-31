import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import {
  CRNumberInput,
  CRSelectInput,
  CRSelectWithOrganization,
  CRBrancheTree,
} from 'components/widgets';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
const operationTypes = [
  { id: 'Add', name: 'Add' },
  { id: 'Subtract', name: 'Subtract' },
];

function ReconstructSales({ formValue, setFormValue, itemsChoices }) {
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
  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <CRSelectInput name="operation" data={operationTypes} block />
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
  );
}

ReconstructSales.defaultProps = {};

export default ReconstructSales;
