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

const AddSpecializtionPermissions = ({ branches, selectSpecializations, onAdd}) => {
  const [formValue, setFormValue] = useState({
    branchId: [],
    specializationId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  });

  const handleDelete = useCallback(
    (idx) => {
    //   handleOnChange(R.remove(idx, 1));
    },
    []
  ); 

  const selectedBranch = useMemo(() => {
    let branchIds =formValue.branchId
    return branches.find((p) => p.id === branchIds) || {};
  }, [formValue, branches]);

  const branchesNames = branches.reduce((obj, {id, name}) =>({
      ...obj,
      [id]: name
  }),{});

  const specializationsNames = R.flatten(branches.map(b=> b.specializations)).reduce((obj, {id, name}) =>({
    ...obj,
    [id]: name
  }));

const items = selectSpecializations.map(({branchId, specializationId})=> `${branchesNames[branchId]} - ${specializationsNames[specializationId]}`)

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
            <CRSelectInput
              placeholder="Select Specialization"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="specializationId"
              data={selectedBranch.specializations || []}
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
            <ListSelectionItems
              items={items}
              onDelete={handleDelete}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Form>
  );
};

AddSpecializtionPermissions.defaultProps = {
    selectSpecializations : []
}

export default memo(AddSpecializtionPermissions);
