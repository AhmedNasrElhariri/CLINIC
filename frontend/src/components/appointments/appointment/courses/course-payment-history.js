import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';
import moment from 'moment';
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
  return (
    <CRCard borderless>
      <CRTable autoHeight data={coursePayments}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Number</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({}, indx) => (
              <CRTable.CRCellStyled bold>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled bold>
                {formatDate(date, 'dddd, DD-MM-YYYY')}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled bold>{user.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Payment</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ payment }) => (
              <CRTable.CRCellStyled bold>{payment}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <CRTable.CRCellStyled bold>
                {toDay(data.date) && (
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
                    {' '}
                    Edit
                  </Icon>
                )}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};

export default CoursePayment;
