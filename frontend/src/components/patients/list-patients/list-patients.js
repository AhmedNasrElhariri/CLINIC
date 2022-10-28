import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Can } from 'components/user/can';
import PatientsFilter from '../filter/patients-filter';
import EditPatient from '../edit-patient';
import { usePatients } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Table } from 'rsuite';

const initialValue = {
  name: '',
  phoneNo: '',
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
    eventKey => {
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
        <Table
          rowClassName="cursor-pointer"
          wordWrap
          data={patients}
          autoHeight
          onRowClick={({ id }) => {
            history.push(`/patients/${id}`);
          }}
          bordered={false}
        >
          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('patient')}</Table.HeaderCell>
            <Table.Cell>{({ name }) => name}</Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('phoneNo')}</Table.HeaderCell>
            <Table.Cell>{({ phoneNo }) => phoneNo}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('phoneNoTwo')}</Table.HeaderCell>
            <Table.Cell>{({ phoneNoTwo }) => phoneNoTwo}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={64}>
            <Table.HeaderCell>{t('code')}</Table.HeaderCell>
            <Table.Cell>{({ code }) => code}</Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.Cell>
              {data => <EditPatient patient={data} t={t} />}
            </Table.Cell>
          </Table.Column>
        </Table>

        <Table.Pagination
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
          onChangePage={p => setCurrentPage(p)}
        />
      </Can>
    </>
  );
}

export default Patients;
