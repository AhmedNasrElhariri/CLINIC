import React, { useEffect } from "react";
import { Form } from "rsuite";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  CRDatePicker,
  ShowIf,
  CRCheckBoxGroup,
  CRLabel,
  CRRadio,
  CRTextArea,
} from "components";
import moment from "moment";

const membershipTypes = [
  { name: "Primary", value: "Primary" },
  { name: "Secondary", value: "Secondary" },
];

const SEX = ["Male", "Female"].map((s) => ({
  name: s,
  value: s,
}));
const ageOptions = [
  { name: "Age", value: "age" },
  { name: "Birth Of Date", value: "birthOfDate" },
];
const phoneOptions = [
  { name: "One Phone Number", value: "one" },
  { name: "Two Phone Numbers", value: "two" },
];

const options = [
  { name: "FaceBook", value: "facebook" },
  { name: "Instagram", value: "instagram" },
  { name: "Twitter", value: "twitter" },
  { name: "Internet", value: "Internet" },
  { name: "BillBoard", value: "billboard" },
  { name: "Another Doctor", value: "another doctor" },
  { name: "Others", value: "others" },
  { name: "Friends", value: "friends" },
];

const patientLevel = [
  { name: "VIP", value: "VIP" },
  { name: "Normal", value: "Normal" },
];

const maritalStatus = [
  { name: "Married", value: "Married" },
  { name: "Single", value: "Single" },
];

const isPrimary = ({ type }) => type === membershipTypes[0].value;
const isSecondary = ({ type }) => type === membershipTypes[1].value;

const NewPatient = ({
  formValue,
  onChange,
  newAreas,
  checkResult,
  show,
  branches,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (formValue.date) {
      const years = moment().diff(formValue.date, "years");
      onChange({ ...formValue, age: years });
    }
  }, [formValue.date]);
  return (
    <Form fluid formValue={formValue} onChange={onChange}>
      <CRSelectInput
        label={t("membershipType")}
        valueKey="value"
        name="type"
        data={membershipTypes}
        block
      />
      <CRTextInput
        label={t("patient")}
        name="name"
        errorMessage={
          show && checkResult["name"].hasError
            ? checkResult["name"].errorMessage
            : ""
        }
      />

      <ShowIf show={isPrimary(formValue)}>
        <CRRadio options={phoneOptions} name="phoneOption" />
        <CRLabel>{t("phoneNo")}</CRLabel>
        <PhoneInput
          country={"eg"}
          name="phoneNo"
          value={formValue.phoneNo}
          enableSearch
          onChange={(phone) => onChange({ ...formValue, phoneNo: phone })}
          containerStyle={{ marginTop: "10px" }}
          inputStyle={{ width: "100%", borderRadius: "0px" }}
        />
        {formValue.phoneOption === "two" && (
          <>
            <CRLabel>Phone No Two</CRLabel>
            <PhoneInput
              country={"eg"}
              name="phoneNoTwo"
              value={formValue.phoneNoTwo}
              enableSearch
              onChange={(phone) =>
                onChange({ ...formValue, phoneNoTwo: phone })
              }
              containerStyle={{ marginTop: "10px" }}
              inputStyle={{ width: "100%", borderRadius: "0px" }}
            />
          </>
        )}
      </ShowIf>

      <ShowIf show={isSecondary(formValue)}>
        <CRTextInput label="Guardian's Name" name="guardianName" />
        <CRTextInput label="Guardian's Phone No" name="phoneNo" />
      </ShowIf>
      <CRRadio options={ageOptions} name="ageOption" />
      {formValue.ageOption === "age" && (
        <CRNumberInput
          label={t("age")}
          name="age"
          errorMessage={
            show && checkResult["age"].hasError
              ? checkResult["age"].errorMessage
              : ""
          }
        />
      )}

      {formValue.ageOption === "birthOfDate" && (
        <CRDatePicker label={t("birthOfDate")} block name="date" />
      )}
      <CRSelectInput
        label={t("branch")}
        name="branchId"
        valueKey="id"
        searchable={false}
        data={branches}
        block
      />
      <CRSelectInput
        label={t("type")}
        name="sex"
        valueKey="value"
        searchable={false}
        data={SEX}
        block
      />
      <CRTextInput label={t("email")} name="email" />
      <CRSelectInput
        label={t("maritalStatus")}
        name="maritalStatus"
        valueKey="value"
        searchable={false}
        data={maritalStatus}
        block
      />
      <CRSelectInput
        label={t("patientLevel")}
        name="patientLevel"
        valueKey="value"
        searchable={false}
        data={patientLevel}
        block
      />
      <CRSelectInput label={t("area")} name="area" data={newAreas} block />
      <CRTextInput label="Code" name="code" />
      <CRTextInput label={t("patientId")} name="patientId" />
      <CRCheckBoxGroup
        label={t("reference")}
        options={options}
        value={formValue.reference}
        onChange={(val) => onChange({ ...formValue, reference: val })}
        inline
      />
      <CRTextArea name="notes" label="Notes" />
    </Form>
  );
};

export default NewPatient;
