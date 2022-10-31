import React from 'react';
import { CRCard } from 'components';
import { formatDate } from 'utils/date';
import { useTranslation } from 'react-i18next';
import { Table } from 'rsuite';

const CoursePayment = ({ sessions, handleClick }) => {
  const { t } = useTranslation();
  return (
    <CRCard borderless>
      <Table
        wordWrap
        autoHeight
        data={sessions}
        onRowClick={appointment => {
          handleClick(appointment);
        }}
      >
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>{t('number')}</Table.HeaderCell>
          <Table.Cell>
            {(_, indx) => <Table.CellStyled bold>{indx + 1}</Table.CellStyled>}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>{t('date')}</Table.HeaderCell>
          <Table.Cell>
            {({ date }) => formatDate(date, 'dddd, DD-MM-YYYY')}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>{t('time')}</Table.HeaderCell>
          <Table.Cell>{({ date }) => formatDate(date, 'hh : mm a')}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>{t('status')}</Table.HeaderCell>
          <Table.Cell>{({ status }) => status}</Table.Cell>
        </Table.Column>
      </Table>
    </CRCard>
  );
};

export default CoursePayment;
