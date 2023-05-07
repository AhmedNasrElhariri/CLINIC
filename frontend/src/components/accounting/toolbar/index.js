import { CRButtonGroup, Div, CRDateRangePicker } from 'components';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';

const Toolbar = ({ activeKey, onSelect, onChangePeriod }) => {
  const { t } = useTranslation();
  return (
    <Div display="flex" className="flex-wrap items-baseline justify-between gap-4">
      <CRButtonGroup onSelect={onSelect} activeKey={activeKey}>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.DAY}>
          {t('today')}
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.WEEK}>
          {t('week')}
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.MONTH}>
          {t('month')}
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.QUARTER}>
          {t('quarter')}
        </CRButtonGroup.CRButton>
        <CRButtonGroup.CRButton eventKey={ACCOUNTING_VIEWS.YEAR}>
          {t('year')}
        </CRButtonGroup.CRButton>
      </CRButtonGroup>

      <Div width={256}>
        <Form fluid>
          <CRDateRangePicker
            name=""
            label=""
            placeholder={t('timeframe')}
            size="sm"
            block
            small
            $noLabel
            onChange={onChangePeriod}
            placement="auto"
          />
        </Form>
      </Div>
    </Div>
  );
};

Toolbar.defaultProps = {
  data: {
    revenues: [],
    expenses: [],
  },
};

export default Toolbar;
