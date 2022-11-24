import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CRTable } from "components";
import { Can } from "components/user/can";
import PatientsFilter from "../filter/patients-filter";
import EditPatient from "../edit-patient";
import { usePatients } from "hooks";
import { useTranslation } from "react-i18next";
const initialValue = {
  name: "",
  phoneNo: "",
};
const inialCurrentPage = {
  activePage: 1,
};

function Patients() {
  const history = useHistory();
  const [filter, setFilter] = useState(initialValue);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage.activePage;
  const { patients, pages } = usePatients({
    page,
    name: filter.name,
    phoneNo: filter.phoneNo,
  });
  const handleSelect = useCallback(
    (eventKey) => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <>
      <Can I="View" an="Patient">
        <PatientsFilter
          formValue={filter}
          setFormValue={setFilter}
        ></PatientsFilter>
        <CRTable
          data={patients}
          autoHeight
          onRowClick={({ id }) => {
            history.push(`/patients/${id}`);
          }}
          bordered={false}
        >
          <CRTable.CRColumn flexGrow={1} minWidth={160}>
            <CRTable.CRHeaderCell>{t("patient")}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1} minWidth={128}>
            <CRTable.CRHeaderCell>{t("phoneNo")}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ phoneNo }) => (
                <CRTable.CRCellStyled bold>{phoneNo}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1} minWidth={128}>
            <CRTable.CRHeaderCell>{t("phoneNoTwo")}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ phoneNoTwo }) => (
                <CRTable.CRCellStyled bold>{phoneNoTwo}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1} minWidth={92}>
            <CRTable.CRHeaderCell>{t("code")}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ code }) => (
                <CRTable.CRCellStyled bold>{code}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1} minWidth={64}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {(data) => <EditPatient patient={data} t={t} />}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>

        <CRTable.CRPagination
          lengthMenu={[
            {
              value: 10,
              label: 10,
            },
            {
              value: 20,
              label: 20,
            },
          ]}
          activePage={currentPage?.activePage}
          pages={pages}
          onSelect={handleSelect}
          total={patients && patients.length}
          onChangePage={(p) => setCurrentPage(p)}
        />
      </Can>
    </>
  );
}

export default Patients;
