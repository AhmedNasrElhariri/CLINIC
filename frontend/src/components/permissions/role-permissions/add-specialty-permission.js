import React, { useState, memo, useMemo, useCallback } from 'react';
import * as R from 'ramda';

import { Form, FlexboxGrid } from 'rsuite';

import { CRSelectInput, CRButton } from 'components';
import ListSelectionItems from '../list-selections-items/index';

const AddSpecializtionPermissions = ({ branches, selectedItems, onAdd }) => {
  const [formValue, setFormValue] = useState({
    branchId: [],
    specialtyId: null,
  });

  const add = useCallback(() => {
    onAdd(formValue);
  }, [formValue, onAdd]);

  const selectedBranch = useMemo(() => {
    let branchIds = formValue.branchId;
    return branches.find(p => p.id === branchIds) || {};
  }, [formValue, branches]);

  const branchesNames = branches.reduce(
    (obj, { id, name }) => ({
      ...obj,
      [id]: name,
    }),
    {}
  );

  const specialtiesNames = R.flatten(
    branches.map(b => b.specialties)
  ).reduce((obj, { id, name }) => ({
    ...obj,
    [id]: name,
  }));

  const items = selectedItems.map(
    ({ branchId, specialtyId }) =>
      `${branchesNames[branchId]} - ${specialtiesNames[specialtyId]}`
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
            {' '}
            <CRSelectInput
              placeholder="Select Specialty"
              block
              cleanable={false}
              searchable={false}
              labelKey="name"
              valueKey="id"
              name="specialtyId"
              data={selectedBranch.specialties || []}
            />
          </FlexboxGrid.Item>

          <FlexboxGrid.Item colspan={6}>
            {' '}
            <CRButton primary small onClick={add}>
              + Add New
            </CRButton>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={22}>
            {' '}
            <ListSelectionItems items={items} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Form>
  );
};

AddSpecializtionPermissions.defaultProps = {
  selectedItems: [],
};

export default memo(AddSpecializtionPermissions);
