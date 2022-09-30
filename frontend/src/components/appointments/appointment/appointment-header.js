import { H3, CRButton } from 'components';
import { Icon } from 'rsuite';

export default function AppointmentHeader({
  handleClickCreateFour,
  disabled,
  handleClickCreate,
  handleClickCreateThree,
  handleClickCreateTwo,
  handleUpdate,
  setDisabled,
  t,
}) {
  return (
    <div className="flex items-center justify-between flex-col sm:flex-row sm:mb-32">
      <H3 className="mb-4">{t('appointment')}</H3>
      <div className="inline-flex flex-wrap gap-1">
        <CRButton
          variant="primary"
          onClick={handleClickCreateFour}
          disabled={disabled}
        >
          {t('showMedicines')} <Icon icon="print" />
        </CRButton>
        <CRButton
          variant="primary"
          onClick={handleClickCreate}
          disabled={disabled}
        >
          {t('printMedicine')} <Icon icon="print" />
        </CRButton>
        <CRButton
          variant="primary"
          onClick={handleClickCreateThree}
          disabled={disabled}
        >
          {t('printImages')} <Icon icon="print" />
        </CRButton>
        <CRButton
          variant="primary"
          onClick={handleClickCreateTwo}
          disabled={disabled}
        >
          {t('printLabs')} <Icon icon="print" />
        </CRButton>
        {disabled && (
          <CRButton
            variant="primary"
            onClick={param => {
              handleUpdate(param);
              setDisabled(false);
            }}
          >
            {t('edit')} <Icon icon="save" />
          </CRButton>
        )}

        <CRButton variant="primary" onClick={handleUpdate} disabled={disabled}>
          {t('save')} <Icon icon="save" />
        </CRButton>
      </div>
    </div>
  );
}
