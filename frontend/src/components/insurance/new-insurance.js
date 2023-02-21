import { useCallback, useMemo } from 'react';
import { Form } from 'rsuite';
import {
  CRModal,
  CRNumberInput,
  CRTextInput,
  CRSelectInput,
  CRDatePicker,
  CRBrancheTree,
  Div,
} from 'components';
import ListInvoiceItems from 'components/appointments/list-invoice-items';
import { filterPatientBy } from 'utils/patient';
import { paymentMthod, ACTIONS } from 'utils/constants';
import { useCompanySessionDefinition } from 'hooks';
import SessionParts from './session-parts';
import * as R from 'ramda';
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
  selectedSessions,
  setSelectedSessions,
}) => {
  const header = useMemo(
    () =>
      type === 'addNewInsurance' ? t('addNewInsurance') : t('editInsurance'),
    [t, type]
  );
  const { companysSessionDefinition } = useCompanySessionDefinition({});
  const companyId = formValue?.companyId;
  const companySessions = useMemo(
    () => companysSessionDefinition.filter(s => s.company.id === companyId),
    [companyId, companysSessionDefinition]
  );
  const updatedCompanySessions = companySessions.map(
    ({ name, price, id, company }) => {
      return {
        name: name,
        id: { price: price, id: id, companyId: company?.id, name: name },
      };
    }
  );
  const handleDelete = useCallback(
    idx => {
      setSelectedSessions(R.remove(idx, 1));
    },
    [setSelectedSessions]
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
        {type === 'addNewInsurance' ? (
          <>
            {' '}
            <CRDatePicker label={t('date')} name="date" block></CRDatePicker>
            <CRSelectInput
              name="companyId"
              label={t('company')}
              labelKey="name"
              valueKey="id"
              block
              data={companysDefinition}
            />
            <SessionParts
              t={t}
              sessions={updatedCompanySessions}
              selectedSessions={selectedSessions}
              setSelectedSessions={setSelectedSessions}
            />
            <Div my={3}>
              <ListInvoiceItems
                items={selectedSessions}
                onDelete={handleDelete}
              />
            </Div>
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
        ) : (
          <>
            <CRTextInput name="name" label={t('name')} />
            <CRNumberInput name="totalAmount" label={t('totalAmount')} />
            <CRSelectInput
              label={t('session')}
              placeholder={t('select')}
              name="session"
              data={updatedCompanySessions}
              block
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
