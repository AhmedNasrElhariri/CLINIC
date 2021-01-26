import React, { useState } from "react";
import PropTypes from "prop-types";
import { CRCard, H3, H6, Div } from "components";
import { PatientInfoStyled } from "./style";
import { Allergies } from "utils/constants";

import { Button, Checkbox } from "rsuite";

const initValue = Allergies.map((d) => ({
  checked: false,
}));

const AllergiesBox = () => {
  const [formValue, setFormValue] = useState(initValue);

  const onChange = (value, idx) => {
    formValue[idx].checked = value;
    setFormValue([...formValue]);
  };
  return (
    <Div>
      {Allergies.map((d, idx) => (
        <Div display="flex" my={5} key={idx} mt={idx === 0 ? 0 : 5}>
          <Checkbox
            checked={formValue[idx].checked}
            onChange={(_, val) => onChange(val, idx)}
          >
            {d}
          </Checkbox>
        </Div>
      ))}
    </Div>
  );
};

export default function PatientInfo({ patient }) {
  return (
    <PatientInfoStyled>
      <CRCard borderless>
        <Div
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <H3 mb={4}>Information</H3>
          <Button color="">Edit</Button>
        </Div>
        <Div
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <H6 mb={4}>Date Of Birth</H6>
          <address>
            {" "}
            {patient.sex} . {patient.age} yrs
          </address>
        </Div>
        <Div
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <H6 mb={4}>Email</H6>
        </Div>
        <Div
          ml={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <H6 mb={4}>Phone Number</H6>
          <address>{patient.phoneNo}</address>
        </Div>
      </CRCard>
      <CRCard>
        <AllergiesBox />
      </CRCard>
    </PatientInfoStyled>
  );
}

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};
