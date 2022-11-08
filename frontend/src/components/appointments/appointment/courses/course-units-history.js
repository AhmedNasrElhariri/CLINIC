import React from 'react';
import { CRCard, CRTable } from 'components';
import { formatDate } from 'utils/date';
import { Icon } from 'rsuite';
import { useTranslation } from 'react-i18next';

const CourseUnitsHistory = ({ courseUnitsHistory, onEdit, courseId }) => {
  const { t } = useTranslation();
  return (
    <CRCard borderless>
      <CRTable autoHeight data={courseUnitsHistory}>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('number')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({}, indx) => (
              <CRTable.CRCellStyled bold>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled bold>
                {formatDate(date, 'dddd, DD-MM-YYYY')}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('creator')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled bold>{user.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('units')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ units }) => (
              <CRTable.CRCellStyled bold>{units}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>{t('notes')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ notes }) => (
              <CRTable.CRCellStyled bold>{notes}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <CRTable.CRCellStyled bold>
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
                  {' '}
                  {t('edit')}
                </Icon>
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </CRCard>
  );
};

export default CourseUnitsHistory;
