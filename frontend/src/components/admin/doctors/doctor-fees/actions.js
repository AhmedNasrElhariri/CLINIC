import { CRButton, Div } from 'components';
const Actions = ({ filter, handlePayDoctorFees, addNewFees, print }) => {
  return (
    <>
      {filter?.status === 'Draft' && (
        <Div mt="43px" ml="10px">
          <CRButton onClick={handlePayDoctorFees}>Pay doctor fees </CRButton>
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
