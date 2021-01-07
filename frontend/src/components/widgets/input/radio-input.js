import React, { useState, memo, useCallback } from "react";
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
import Label from "../label";
import { InputStyled, InputGroupStyled } from "./style";
import { CRSelectInput, H6, CRButton, Div, H5, H7 } from "components";
import ListSelectionItems from "../../permissions/list-selections-items/index";
import useFetchAppointments from "../../../hooks/fetch-appointments";
import { mapArrWithLabelsToChoices, mapArrWithIdsToChoices } from "utils/misc";

const RadioInputsGroup = ({
  label,
  LevelsPermissions,
  handleSelect,
  level,
  onChange,
  onBranchChange,
  onSpecializationChange,
  onUserChange,
  showBranches,
  showSpecialization,
  showUser,
}) => {
  const [session, setSession] = useState({});
  const { branches, doctors, specializations } = useFetchAppointments();
  const [selectedSessions, setSelectedSessions] = useState([]);

  const handleOnChange = useCallback(
    (sessions) => {
      setSelectedSessions(sessions);
      handleSelect(sessions);
      setSession({});
    },
    [handleSelect]
  );
  const add = useCallback(() => {
    if (!session) {
      return;
    }
    handleOnChange([...selectedSessions, session]);
  }, [handleOnChange, selectedSessions, session]);

  const handleDelete = useCallback(
    (idx) => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );
  return (
    <FormGroup>
      <Label>{label}</Label>
      <RadioGroup name="radioList">
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"organization"} onChange={onChange}>
              Organization
            </Radio>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"branch"} onChange={onChange}>
              branch
            </Radio>
            </FlexboxGrid.Item>
            {showBranches && (
              <>
              <FlexboxGrid.Item colspan={6}>
              {" "}
              <CRSelectInput
                placeholder="Select Branch"
                block
                cleanable={false}
                searchable={false}
                value={session}
                onChange={onBranchChange}
                data={mapArrWithIdsToChoices(branches)}
              />
            </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>
                {" "}
                <CRButton primary small onClick={add}>
                  + Add New
                </CRButton>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={22}>
                {" "}
                <ListSelectionItems
                  items={selectedSessions}
                  onDelete={handleDelete}
                />
              </FlexboxGrid.Item>
              </>
            )}
        
      
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"specialization"} onChange={onChange}>
              Specialization
            </Radio>
            </FlexboxGrid.Item>
            {showSpecialization && (
              <>
              <FlexboxGrid.Item colspan={6}>
              {" "}
              <CRSelectInput
                placeholder="Select Specialization"
                block
                cleanable={false}
                searchable={false}
                value={session}
                onChange={onSpecializationChange}
                data={mapArrWithIdsToChoices(specializations)}
              />
               <CRSelectInput
                placeholder="Select Branch"
                block
                cleanable={false}
                searchable={false}
                value={session}
                onChange={onBranchChange}
                data={mapArrWithIdsToChoices(branches)}
              />
            </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>
                {" "}
                <CRButton primary small onClick={add}>
                  + Add New
                </CRButton>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={22}>
                {" "}
                <ListSelectionItems
                  items={selectedSessions}
                  onDelete={handleDelete}
                />
              </FlexboxGrid.Item>
              </>
            )}
        
      
        </FlexboxGrid>
        <FlexboxGrid align="middle" justify="space-between">
          <FlexboxGrid.Item colspan={4}>
            {" "}
            <Radio value={"user"} onChange={onChange}>
              User
            </Radio>
            </FlexboxGrid.Item>
            {showUser && (
              <>
              <FlexboxGrid.Item colspan={6}>
              {" "}
              <CRSelectInput
                placeholder="Select User"
                block
                cleanable={false}
                searchable={false}
                value={session}
                onChange={onUserChange}
                data={mapArrWithIdsToChoices(doctors)}
              />
                <CRSelectInput
                placeholder="Select Branch"
                block
                cleanable={false}
                searchable={false}
                value={session}
                onChange={onBranchChange}
                data={mapArrWithIdsToChoices(branches)}
              />
            </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={4}>
                {" "}
                <CRButton primary small onClick={add}>
                  + Add New
                </CRButton>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={22}>
                {" "}
                <ListSelectionItems
                  items={selectedSessions}
                  onDelete={handleDelete}
                />
              </FlexboxGrid.Item>
              </>
            )}
        
      
        </FlexboxGrid>
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(RadioInputsGroup);
