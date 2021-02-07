import React, { useCallback, useMemo, useState } from "react";
import { Schema, Input, Tree } from "rsuite";
import { nanoid } from "nanoid";
import { CRModal, CRButton } from "components";

const model = Schema.Model({});
const findNode = (nodeId, DataItemType, node) => {
  if (node.value == nodeId) {
    if (!node.children) {
      node.children = [];
    }
    node.children.push(DataItemType);
  } else {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        findNode(nodeId, DataItemType, node.children[i]);
      }
    }
  }
};

function NewTree({ type, visible, onOk, onClose, onChange }) {
  const header = useMemo(
    () => (type === "create" ? "Add New Tree Values" : "Edit Tree Values"),
    [type]
  );
  const [label, setLabel] = useState("");
  const [activeNode, setActiveNode] = useState({});
  const DataItemType = {
    value: nanoid(),
    label: label,
    refKey: activeNode.refKey,
    visible: true,
  };
  const [data, setData] = useState([
    {
      label: "Root",
      value: 0,
      children: [],
    },
  ]);
  const addNode = useCallback(() => {
    findNode(activeNode.value, DataItemType, data[0]);
    setData([data[0]]);
    console.log(data);
    setActiveNode({});
    setLabel("");
  }, [activeNode]);
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
        onChange={(value) => setLabel(value)}
        style={{ display: "inline", width: "75%", margin: 5 }}
      ></Input>
      <CRButton
        primary
        small
        block
        style={{ float: "right", width: "20%" }}
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
  type: "create",
};

export default NewTree;
