import React from 'react';

import { CRModal, Div, H3 } from 'components';

function DeleteImage({ visible, onOk, onClose, header }) {
  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Div>
        <H3>Are you sure that you want to delete the Image ? </H3>
      </Div>
    </CRModal>
  );
}

export default DeleteImage;
