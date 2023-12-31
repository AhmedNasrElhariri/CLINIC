import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  return arr.map(({ value, label, children }) => {
    return Object.assign(
      {
        id: value,
        name: label,
      },
      children && children.length && { choices: toChoices(children) }
    );
  });
};
const convertChoices = arr => {
  if (!arr || !arr.length) {
    return [];
  }
  return arr.map(({ id, name, choices }) => {
    return Object.assign(
      {
        value: id,
        label: name,
      },
      choices && choices.length && { children: convertChoices(choices) }
    );
  });
};

function NestedChoices({ visible, onOk, onClose, choices }) {
  const [label, setLabel] = useState('');
  const [activeNode, setActiveNode] = useState({});
  const dataItemType = useMemo(
    () => ({
      value: nanoid(),
      label: label,
      refKey: activeNode.refKey,
      visible: true,
    }),
    [label, activeNode.refKey]
  );
  const [data, setData] = useState([
    {
      label: 'Root',
      value: 0,
      children: choices && Array.isArray(choices) && convertChoices(choices),
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
