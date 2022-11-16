import React from "react";
import { CRCard } from "components";
import { formatDate } from "utils/date";
import { Icon, Table } from "rsuite";
import { useTranslation } from "react-i18next";

const CourseUnitsHistory = ({ courseUnitsHistory, onEdit, courseId }) => {
  const { t } = useTranslation();
  return (
    <CRCard borderless>
      <Table
        autoHeight
        wordWrap
        className="text-sm text-gray-600"
        data={courseUnitsHistory}
      >
        <Table.Column flexGrow={1} minWidth={64}>
          <Table.HeaderCell>{t("number")}</Table.HeaderCell>
          <Table.Cell>{(_, indx) => indx + 1}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={192}>
          <Table.HeaderCell>{t("date")}</Table.HeaderCell>
          <Table.Cell>
            {({ date }) => formatDate(date, "dddd, DD-MM-YYYY")}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={128}>
          <Table.HeaderCell>{t("creator")}</Table.HeaderCell>
          <Table.Cell>{({ user }) => user.name}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={48}>
          <Table.HeaderCell>{t("units")}</Table.HeaderCell>
          <Table.Cell>{({ units }) => units}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={48}>
          <Table.HeaderCell>{t("notes")}</Table.HeaderCell>
          <Table.Cell>{({ notes }) => notes}</Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.Cell>
            {(data) => (
              <Icon
                icon="edit"
                onClick={() => {
                  const newData = {
                    id: courseId,
                    units: data.units,
                    transactionId: data.id,
                    notes: data.notes,
                  };
                  onEdit(newData);
                }}
              >
                {" "}
                {t("edit")}
              </Icon>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
    </CRCard>
  );
};

export default CourseUnitsHistory;
