import React, { useCallback, useState } from 'react';
import { Input, Tree, Button } from 'rsuite';
import { nanoid } from 'nanoid';
import { CRModal } from 'components';

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

const toChoices = arr => {
  if (!arr || !arr.length) {
    return [];
  }
  return arr.map(({ label, children }) => {
    return {
      name: label,
      choices: toChoices(children),
    };
  });
};

function NestedChoices({ visible, onOk, onClose }) {
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

  const handleOnOk = useCallback(() => {
    onOk(toChoices(data[0].children));
  }, [data, onOk]);

  return (
    <CRModal
      show={visible}
      header="Choices"
      onOk={handleOnOk}
      onHide={onClose}
      onCancel={onClose}
    >
      <Input
        lable="input"
        value={label}
        onChange={value => setLabel(value)}
        style={{ display: 'inline', width: '75%', margin: 5 }}
      ></Input>
      <Button
        primary
        small
        block
        style={{ float: 'right', width: '20%' }}
        onClick={addNode}
      >
        ADD
      </Button>
      <Tree
        data={data}
        defaultExpandAll
        onSelect={(activeNode, value, event) => setActiveNode(activeNode)}
      />
    </CRModal>
  );
}

export default NestedChoices;
