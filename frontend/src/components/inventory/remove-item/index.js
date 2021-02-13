import React, { memo, useCallback } from 'react';
import { Alert, Icon } from 'rsuite';

import { CRModal, H6 } from 'components';
import useFetctchInventory from 'hooks/fetch-inventory';
import useModal from 'hooks/use-model';

const RemoveItem = ({ item }) => {
  const { visible, open, close } = useModal();

  const { removeItem } = useFetctchInventory({
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
        <H6>Are you want sure?</H6>
      </CRModal>
    </>
  );
};

RemoveItem.propTypes = {};

export default memo(RemoveItem);
