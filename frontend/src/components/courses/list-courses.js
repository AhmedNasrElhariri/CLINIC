import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CRCard } from 'components';
import { Table } from 'rsuite';

function ListCourses({
  courses,
  setCourse,
  setShowCourseData,
  currentPage,
  setCurrentPage,
  pages,
}) {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <Table
          rowClassName="text-sm font-normal text-gray-500 cursor-pointer"
          wordWrap
          autoHeight
          data={courses}
          onRowClick={course => {
            setCourse(course);
            setShowCourseData(true);
          }}
        >
          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('courseName')}</Table.HeaderCell>
            <Table.Cell>{({ name }) => name}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('patient')}</Table.HeaderCell>
            <Table.Cell>{({ patient }) => patient.name}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={128}>
            <Table.HeaderCell>{t('phoneNo')}</Table.HeaderCell>
            <Table.Cell>{({ patient }) => patient.phoneNo}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={64}>
            <Table.HeaderCell>{t('coursePrice')}</Table.HeaderCell>
            <Table.Cell>{({ price }) => price}</Table.Cell>
          </Table.Column>
          <Table.Column flexGrow={1} minWidth={64}>
            <Table.HeaderCell>{t('courseUnpaid')}</Table.HeaderCell>
            <Table.Cell>{({ price, paid }) => price - paid}</Table.Cell>
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
          total={courses.length}
        />
      </CRCard>
    </>
  );
}

export default ListCourses;
