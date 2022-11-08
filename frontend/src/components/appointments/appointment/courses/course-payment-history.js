import React from 'react';
import { CRCard } from 'components';
import { formatDate } from 'utils/date';
import { Icon, Table } from 'rsuite';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const toDay = date => {
  const newDate = moment(date).toDate();
  let TODAY = false;
  const startDate = moment().startOf('day').toDate();
  const endOfDate = moment().endOf('day').toDate();
  if (newDate >= startDate && newDate <= endOfDate) {
    TODAY = true;
  }

  return TODAY;
};
const CoursePayment = ({ coursePayments, onEdit, courseId }) => {
  const { t } = useTranslation();
  return (
    <CRCard borderless>
      <Table
        autoHeight
        data={coursePayments}
        wordWrap
        rowClassName="text-sm text-gray-600"
      >
        <Table.Column flexGrow={1} minWidth={64}>
          <Table.HeaderCell>{t('number')}</Table.HeaderCell>
          <Table.Cell>{(_, indx) => indx + 1}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={192}>
          <Table.HeaderCell>{t('date')}</Table.HeaderCell>
          <Table.Cell>
            {({ date }) => formatDate(date, 'dddd, DD-MM-YYYY')}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={128}>
          <Table.HeaderCell>{t('creator')}</Table.HeaderCell>
          <Table.Cell>{({ user }) => user.name}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={92}>
          <Table.HeaderCell>{t('type')}</Table.HeaderCell>
          <Table.Cell>{({ type }) => type}</Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} minWidth={92}>
          <Table.HeaderCell>{t('payment')}</Table.HeaderCell>
          <Table.Cell>{({ payment }) => payment}</Table.Cell>
        </Table.Column>
        <Table.Column>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.Cell>
            {data =>
              toDay(data.date) &&
              data?.type === 'Payment' && (
                <Icon
                  icon="edit"
                  onClick={() => {
                    const newData = {
                      id: courseId,
                      paid: data.payment,
                      paymentId: data.id,
                    };
                    onEdit(newData);
                  }}
                >
                  {t('edit')}
                </Icon>
              )
            }
          </Table.Cell>
        </Table.Column>
      </Table>
    </CRCard>
  );
};

export default CoursePayment;
