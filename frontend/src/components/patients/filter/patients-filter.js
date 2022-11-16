import React from "react";
import { CRTextInput, CRSelectInput } from "components";
import { Form } from "rsuite";

import { useTranslation } from "react-i18next";

const PatientsFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();

  return (
    <Form
      className="my-10 flex flex-wrap gap-5"
      formValue={formValue}
      onChange={setFormValue}
    >
      <CRTextInput
        label={t("nameOrCode")}
        name="name"
        placeholder="Search"
        style={{ width: "200px" }}
      />

      <CRTextInput
        label={t("phoneNo")}
        name="phoneNo"
        placeholder="Search"
        style={{ width: "200px" }}
      />
      {/* <CRSelectInput
        label={t("branch")}
        name="branchId"
        valueKey="id"
        searchable={false}
        data={branches}
        block
      /> */}
    </Form>
  );
};

export default PatientsFilter;
