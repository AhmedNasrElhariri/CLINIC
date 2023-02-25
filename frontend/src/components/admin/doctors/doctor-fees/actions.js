import { CRButton, Div } from 'components';
const Actions = ({
  filter,
  handlePayDoctorFees,
  addNewFees,
  print,
  checkedKeys,
  handleRevertDoctorFees
}) => {
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
        <CRButton onClick={print}>print </CRButton>
      </Div>
    </>
  );
};
export default Actions;
