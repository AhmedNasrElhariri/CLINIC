import { CRModal, Div } from 'components';

const InventoryModel = ({ show, handleCancel, handleOk, close, header }) => {
  return (
    <>
      <CRModal
        show={show}
        header={header}
        onOk={handleOk}
        onHide={() => {
          close();
        }}
        onCancel={handleCancel}
        className="!w-[1024px]"
      >
        <Div fontWeight="bold" textAlign="center" fontSize="20px">
          Are you sure that you want to {header} ?
        </Div>
      </CRModal>
    </>
  );
};
export default InventoryModel;
