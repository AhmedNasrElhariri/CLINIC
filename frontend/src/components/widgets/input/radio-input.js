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
  onChange,
  level,
  showBranches,
  showSpecialization,
  showUser
}) => {
  const [session, setSession] = useState({});
  const { branches, doctors, specializations } = useFetchAppointments();
  const [selectedSessions, setSelectedSessions] = useState([]);

  const handleOnChange = useCallback(
    (sessions) => {
      setSelectedSessions(sessions);
      onChange(sessions);
      setSession({});
    },
    [onChange]
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
        {LevelsPermissions.map((levelName, i) => (
          <Div key={i}>
            <Radio value={levelName} onChange={onChange}>
              {levelName}
            </Radio>
            {(level !== null && showBranches) ? 
              <Form fluid>
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
             
                {
                showSpecialization &&(
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
                    )
                }
                 
                  {
                showUser &&(
                    <CRSelectInput
                      name="type"
                      placeholder="Select Type"
                      block
                      cleanable={false}
                      searchable={false}
                      value={session}
                      onChange={setSession}
                      data={mapArrWithLabelsToChoices(doctors)}
                    />
                    )
                }   
                

                <Div textAlign="right">
                  <CRButton primary small onClick={add}>
                    + Add New
                  </CRButton>
                  {selectedSessions.length > 0 && <Divider />}
                  <Div my={3}>
                    <ListSelectionItems
                      items={selectedSessions}
                      onDelete={handleDelete}
                    />
                  </Div>
                  <Divider />
                </Div>
              </Form> : <></>
            }
          </Div>
        ))}
      </RadioGroup>
    </FormGroup>
  );
};

export default memo(RadioInputsGroup);
