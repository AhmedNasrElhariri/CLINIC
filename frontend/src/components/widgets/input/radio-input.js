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
import { mapArrWithLabelsToChoices } from "utils/misc";

const RadioInputsGroup = ({
  label,
  LevelsPermissions,
  handleSelect,
  level,
  onChange,
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
        <div className="show-grid"></div>
        {LevelsPermissions.map((element, i) => (
          <FlexboxGrid  align="middle" justify="space-between" key={i}>
            <FlexboxGrid.Item colspan={4}>
              {" "}
              <Radio value={element.name} onChange={onChange}>
                {element.name}
              </Radio>
            </FlexboxGrid.Item>
            {(level !== null && level !== 'Organization' ) && (
              <>
              {
                showBranches && (
                  <FlexboxGrid.Item colspan={6}>
                  {" "}
                  <CRSelectInput
                    name="type"
                    placeholder="Select Type"
                    block
                    cleanable={false}
                    searchable={false}
                    value={session}
                    onChange={setSession}
                    data={mapArrWithLabelsToChoices(branches)}
                  />
                  
                </FlexboxGrid.Item>
                )
              }
              {
                showSpecialization && (
                  <FlexboxGrid.Item colspan={6}>
                  {" "}
                  <CRSelectInput
                    name="type"
                    placeholder="Select Type"
                    block
                    cleanable={false}
                    searchable={false}
                    value={session}
                    onChange={setSession}
                    data={mapArrWithLabelsToChoices(specializations)}
                  />
                  
                </FlexboxGrid.Item>
                )
              }
           
            <FlexboxGrid.Item colspan={14}>
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
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(RadioInputsGroup);
