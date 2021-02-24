import React, { memo, useCallback } from 'react';
import { Alert, Icon } from 'rsuite';

import { CRModal, H6 } from 'components';
import useFetctchInventory from 'hooks/use-inventory';
import useModal from 'hooks/use-model';

const RemoveItemDefinition = ({ item }) => {
  const { visible, open, close } = useModal();

  const { removeDefinition } = useFetctchInventory({
    onRemoveDefinition: () => {
      Alert.success('Item has been removed successfully');
      close();
    },
    onRemoveDefinitionError: err => {
      Alert.error(err.message);
    },
  });

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const handleOk = useCallback(() => {
    removeDefinition(item);
  }, [item, removeDefinition]);

  return (
    <>
      <Icon icon="trash2" onClick={open} />

      <CRModal
        show={visible}
        header="Remove Item Definition"
        onOk={handleOk}
        onHide={handleClose}
        onCancel={handleClose}
      >
        <H6>Are you want sure?</H6>
      </CRModal>
    </>
  );
};

RemoveItemDefinition.propTypes = {};

export default memo(RemoveItemDefinition);
