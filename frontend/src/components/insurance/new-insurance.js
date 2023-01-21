import { useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
  CRSelectInput,
  CRDatePicker,
  CRBrancheTree,
  CRRadio,
} from 'components';
import { filterPatientBy } from 'utils/patient';
import { feesCalTypes, paymentMthod, ACTIONS } from 'utils/constants';
const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};
const NewInsurance = ({
  formValue,
  onChange,
  type,
  visible,
  onOk,
  onClose,
  doctors,
  companysDefinition,
  banksDefinition,
  searchedPatients,
  t,
}) => {
  const header = useMemo(() =>
    type === 'addNewInsurance' ? t('addNewInsurance') : t('editInsurance')
  );

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Form formValue={formValue} onChange={onChange} fluid>
        <CRTextInput label={t('name')} name="name" block></CRTextInput>
        <CRNumberInput
          label={t('totalAmount')}
          name="totalAmount"
          block
        ></CRNumberInput>
        {type === 'addNewInsurance' && (
          <>
            {' '}
            <CRRadio
              options={feesCalTypes}
              name="feesCalculationType"
              label="Fixed/Percentage"
            />
            <CRNumberInput
              label={t('patientFees')}
              name="patientFees"
              block
            ></CRNumberInput>
            <CRNumberInput
              label={t('doctorFees')}
              name="doctorFees"
              block
            ></CRNumberInput>
            <CRDatePicker label={t('date')} name="date" block></CRDatePicker>
            <CRSelectInput
              name="companyId"
              label={t('company')}
              labelKey="name"
              valueKey="id"
              block
              data={companysDefinition}
            />
            <CRSelectInput
              name="doctorId"
              label={t('doctor')}
              labelKey="name"
              valueKey="id"
              block
              data={doctors}
            />
            <CRSelectInput
              label={t('patient')}
              name="patientId"
              labelKey="name"
              valueKey="id"
              onSearch={v => {
                if (v) {
                  onChange({ ...formValue, patientSearchValue: v });
                }
              }}
              placeholder="Name / Phone no"
              data={searchedPatients}
              searchBy={searchBy}
              virtualized={false}
              block
            ></CRSelectInput>
            <CRSelectInput
              label={t('paymentMethod')}
              name="paymentMethod"
              data={paymentMthod}
              placeholder={t('select')}
              block
            />
            {formValue.paymentMethod === 'visa' && (
              <CRSelectInput
                label={t('bank')}
                name="bankId"
                data={banksDefinition}
                labelKey="name"
                valueKey="id"
                placeholder={t('select')}
                block
              />
            )}
            <CRBrancheTree
              formValue={formValue}
              onChange={onChange}
              action={ACTIONS.View_DoctorFees}
            />
          </>
        )}
      </Form>
    </CRModal>
  );
};

NewInsurance.defaultProps = {
  type: 'create',
};

export default NewInsurance;
