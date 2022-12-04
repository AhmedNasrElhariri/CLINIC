import React, { useState, useMemo, useRef } from "react";
import { CRTable, CRSelectInput, CRButton, Div } from "components";
import { formatFullDay } from "utils/date";
import { Form, Table } from "rsuite";
import Print from "../print";
import { useInventory } from "hooks";
import { useTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";

const { Cell, Column } = Table;

const initalValue = {
  item: "",
};
const InventoryHistory = () => {
  const { history, items } = useInventory();
  const ref = useRef();
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState(initalValue);
  const newItems = items.map((i) => {
    return {
      id: i.name,
      name: i.name,
    };
  });
  const newHistory = useMemo(
    () =>
      history.filter((h) =>
        h.body.toLowerCase().includes(formValue.item.toLowerCase())
      ),
    [formValue, history]
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-4">{t("history")}</h1>
        {/* <Print history={newHistory} /> */}
        <ReactToPrint
          trigger={() => (
            <CRButton primary mb={20}>
              {t("print")}
            </CRButton>
          )}
          content={() => ref.current}
        />
      </div>
      <Form formValue={formValue} onChange={setFormValue} className="mt-2 mb-7">
        <CRSelectInput
          label={t("item")}
          name="item"
          data={newItems}
          onChange={(val) =>
            val == null ? setFormValue({ ...formValue, item: "" }) : ""
          }
          style={{ width: "300px" }}
        />
      </Form>
      <Table autoHeight data={newHistory} wordWrap>
        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t("date")}</CRTable.CRHeaderCell>
          <Cell semiBold>
            {({ date }) => <span>{formatFullDay(date)}</span>}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <CRTable.CRHeaderCell>{t("actions")}</CRTable.CRHeaderCell>
          <Cell dataKey="body" semiBold />
        </Column>
      </Table>
      <Div style={{ overflow: "hidden", height: "0px" }}>
        <Div ref={ref}>
          <Table autoHeight data={newHistory} wordWrap >
            <Column flexGrow={0.3}>
              <CRTable.CRHeaderCell>{t("date")}</CRTable.CRHeaderCell>
              <Cell semiBold >
                {({ date }) => <span>{formatFullDay(date)}</span>}
              </Cell>
            </Column>

            <Column flexGrow={2}>
              <CRTable.CRHeaderCell>{t("actions")}</CRTable.CRHeaderCell>
              <Cell dataKey="body" semiBold />
            </Column>
          </Table>
        </Div>
      </Div>
    </>
  );
};

export default InventoryHistory;
