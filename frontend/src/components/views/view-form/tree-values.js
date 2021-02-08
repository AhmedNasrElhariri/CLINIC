import React, { useCallback, useMemo, useState } from 'react';
import { Input, Tree } from 'rsuite';
import { nanoid } from 'nanoid';
import { CRModal, CRButton } from 'components';

const findNode = (nodeId, dataItemType, node) => {
  if (node.value === nodeId) {
    if (!node.children) {
      node.children = [];
    }
    node.children = [...node.children, dataItemType];
  } else {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        findNode(nodeId, dataItemType, node.children[i]);
      }
    }
  }
};

function NewTree({ type, visible, onOk, onClose, onChange }) {
  const header = useMemo(
    () => (type === 'create' ? 'Add New Tree Values' : 'Edit Tree Values'),
    [type]
  );
  const [label, setLabel] = useState('');
  const [activeNode, setActiveNode] = useState({});
  const dataItemType = {
    value: nanoid(),
    label: label,
    refKey: activeNode.refKey,
    visible: true,
  };
  const [data, setData] = useState([
    {
      label: 'Root',
      value: 0,
      children: [],
    },
  ]);
  const addNode = useCallback(() => {
    findNode(activeNode.value, dataItemType, data[0]);
    setData([data[0]]);
    setLabel('');
  }, [activeNode.value, data, dataItemType]);

  return (
    <CRModal
      show={visible}
      header={header}
      onOk={onOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Input
        lable="input"
        value={label}
        onChange={value => setLabel(value)}
        style={{ display: 'inline', width: '75%', margin: 5 }}
      ></Input>
      <CRButton
        primary
        small
        block
        style={{ float: 'right', width: '20%' }}
        onClick={addNode}
      >
        ADD
      </CRButton>
      <Tree
        data={data}
        defaultExpandAll
        onSelect={(activeNode, value, event) => setActiveNode(activeNode)}
      />
    </CRModal>
  );
}

NewTree.defaultProps = {
  type: 'create',
};

export default NewTree;
