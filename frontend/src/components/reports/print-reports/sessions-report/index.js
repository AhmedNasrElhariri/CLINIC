import { CRDateRangePicker, CRButton, MenuPopover, CRLabel } from 'components';
import { Form, MultiCascader, Whisper } from 'rsuite';
import ReportRow from '../report-row';
import { Name } from '../style';
const SessionReport = ({
  t,
  handleSessionReport,
  sessionsDefinition,
  formValue,
  setFormValue,
  handleSessionExcelReport,
}) => {
  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? handleSessionReport() : handleSessionExcelReport();
  }
  return (
    <ReportRow>
      <Name>{t('sessionReport')}</Name>
      <Form
        formValue={formValue}
        onChange={setFormValue}
        className="inline-flex flex-wrap items-center"
      >
        <CRDateRangePicker
          name="sessionDate"
          placeholder={t('timeframe')}
          placement="auto"
          style={{ width: '230px', marginRight: '30px' }}
        />
        <MultiCascader
          data={sessionsDefinition}
          onChange={val => setFormValue({ ...formValue, sessionsIds: val })}
          style={{ marginTop: '10px', width: '250px' }}
        />
      </Form>
      <Whisper
        placement="bottomStart"
        trigger="click"
        speaker={<MenuPopover onSelect={handleSelectMenu} />}
      >
        <CRButton>Print</CRButton>
      </Whisper>
      {/* <CRButton onClick={() => setShowSessionData(!showSessionData)}>
          {showSessionData ? t('close') : t('show')}
        </CRButton>
        <ReactToPrint
          trigger={() => <CRButton primary>{t('print')}</CRButton>}
          content={() => refThree.current}
        /> */}
    </ReportRow>
  );
};
export default SessionReport;
