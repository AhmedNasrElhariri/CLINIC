import React, { memo, useCallback } from 'react';
import { Alert, Icon } from 'rsuite';

import { CRModal, H4 } from 'components';
import { useModal, useInventory } from 'hooks';

const RemoveItem = ({ item }) => {
  const { visible, open, close } = useModal();

  const { removeItem } = useInventory({
    onRemoveItem: () => {
      Alert.success('Item has been removed successfully');
      close();
    },
    onRemoveItemError: err => {
      Alert.error(err.message);
    },
  });

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const handleOk = useCallback(() => {
    removeItem(item);
  }, [item, removeItem]);
  return (
    <>
      <Icon icon="trash2" onClick={open} />

      <CRModal
        show={visible}
        header="Remove Item"
        onOk={handleOk}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <H4>Are you sure that you want to delete ?</H4>
      </CRModal>
    </>
  );
};

RemoveItem.propTypes = {};

export default memo(RemoveItem);
