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
<<<<<<< HEAD
        <Whisper
          placement="bottomStart"
          trigger="click"
          speaker={<MenuPopover onSelect={handleSelectMenu} />}
        >
          <CRButton>Prints</CRButton>
        </Whisper>
=======
        <CRButton onClick={print}>Print </CRButton>
>>>>>>> 2b97e55f99e6c513c84615ebb612c5f3dbb903ef
      </Div>
    </>
  );
};
export default Actions;
