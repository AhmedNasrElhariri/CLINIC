import { CRButton, Div, MenuPopover } from 'components';
import { Whisper } from 'rsuite';

const Actions = ({
  filter,
  handlePayDoctorFees,
  addNewFees,
  printPdf,
  checkedKeys,
  handleRevertDoctorFees,
  printExcel,
}) => {
  function handleSelectMenu(eventKey, event) {
    eventKey === 1 ? printPdf() : printExcel();
  }
  return (
    <>
      {filter?.status === 'Draft' && (
        <Div mt="43px" ml="10px">
          <CRButton
            disabled={checkedKeys.length > 0 ? false : true}
            onClick={handlePayDoctorFees}
          >
            Pay{' '}
          </CRButton>
        </Div>
      )}
      {filter?.status === 'Cleared' && (
        <Div mt="43px" ml="10px">
          <CRButton
            disabled={checkedKeys.length > 0 ? false : true}
            onClick={handleRevertDoctorFees}
          >
            Revert{' '}
          </CRButton>
        </Div>
      )}
      <Div mt="43px" ml="10px">
        <CRButton onClick={addNewFees}>Add new fees </CRButton>
      </Div>
      <Div mt="43px" ml="10px">
        <Whisper
          placement="bottomStart"
          trigger="click"
          speaker={<MenuPopover onSelect={handleSelectMenu} />}
        >
          <CRButton>Prints</CRButton>
        </Whisper>
      </Div>
    </>
  );
};
export default Actions;
