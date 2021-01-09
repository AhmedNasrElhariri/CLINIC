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
import { mapArrWithLabelsToChoices, mapArrWithIdsToChoices } from "utils/misc";

const AddUserPermissions = ({ onAdd, branches }) => {
  const [formValue, setFormValue] = useState({
    branchId: null,
    userId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  });

  /*  const handleDelete = useCallback(
    (idx) => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  ); */
  const selectedBranch = useMemo(() => {
    return branches.find((p) => p.id === formValue.branchId) || {};
  }, [formValue, branches]);

  const usersPermissions = (selectedBranch.specializations || []).map(p=> p.users);
  const users = R.flatten(usersPermissions) || [];

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
              placeholder="Select User"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="userId"
              data={users}
            />
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={6}>
            {" "}
            <CRButton primary small onClick={add}>
              + Add New
            </CRButton>
          </FlexboxGrid.Item>
          {/*    <FlexboxGrid.Item colspan={22}>
            {" "}
            <ListSelectionItems
              items={selectedSessions}
              onDelete={handleDelete}
            />
          </FlexboxGrid.Item> */}
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Form>
  );
};

export default memo(AddUserPermissions);
