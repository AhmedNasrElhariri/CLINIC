import React from "react";
import { CRSelectInput, CRNumberInput, Div } from "components";
import { Form } from "rsuite";
import { useTranslation } from "react-i18next";

const types = [
  { id: "prescription", name: "Prescription" },
  { id: "reportPrintout", name: "ReportPrintout" },
  { id: "sales", name: "Sales" },
  { id: "visa", name: "Visa" },
  { id: "accounting", name: "Accounting" },
  { id: "insurance", name: "Insurance" },
  { id: "invoice", name: "Invoice" },
];
const PageSetup = ({ pageSetup, setPageSetup }) => {
  const { t } = useTranslation();
  return (
    <Form formValue={pageSetup} onChange={setPageSetup}>
      <CRSelectInput
        data={types}
        label={t("type")}
        name="type"
        block
        placement="top"
        style={{ width: "300px", marginBottom: "50px" }}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 antd-lg:grid-cols-4 gap-5 text-center">
        <CRNumberInput
          formGroupClassName="flex-1"
          name="top"
          label={t("top")}
          placeholder="By Centimeter"
        />
        <CRNumberInput
          formGroupClassName="flex-1"
          name="right"
          label={t("right")}
          placeholder="By Centimeter"
        />
        <CRNumberInput
          formGroupClassName="flex-1"
          name="bottom"
          label={t("bottom")}
          placeholder="By Centimeter"
        />
        <CRNumberInput
          formGroupClassName="flex-1"
          name="left"
          label={t("left")}
          placeholder="By Centimeter"
        />
      </div>
    </Form>
  );
};

export default PageSetup;
