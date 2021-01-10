import React, { useState, memo, useMemo, useCallback } from "react";
import * as R from "ramda";

import {
  FormGroup,
  RadioGroup,
  Radio,
  Form,
  Divider,
  FormControl,
  InputGroup,
  Icon,
  Col,
  FlexboxGrid,
} from "rsuite";

import { CRSelectInput, H6, CRButton, Div, H5, H7 } from "components";
import ListSelectionItems from "../../permissions/list-selections-items/index";

const AddBranchPermissions = ({ branches, selectedItems, onAdd, onDelete }) => {
  const [formValue, setFormValue] = useState({
    branchId: [],
  });

  const add = useCallback(() => {
    onAdd(formValue);
  });

  const branchesNames = branches.reduce(
    (obj, { id, name }) => ({
      ...obj,
      [id]: name,
    }),
    {}
  );

  const items = selectedItems.map(
    ({ branchId }) => `${branchesNames[branchId]}`
  );

  return (
    <Form formValue={formValue} onChange={setFormValue}>
      <FlexboxGrid.Item colspan={20}>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={6}>
            <CRSelectInput
              placeholder="Select Branch"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="branchId"
              data={branches}
            />
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={6}>
            {" "}
            <CRButton primary small onClick={add}>
              + Add New
            </CRButton>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={22}>
            {" "}
            <ListSelectionItems items={items} onDelete={onDelete} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Form>
  );
};

AddBranchPermissions.defaultProps = {
  selectedItems: [],
};

export default memo(AddBranchPermissions);
