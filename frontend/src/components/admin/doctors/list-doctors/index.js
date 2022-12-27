import React from 'react';
import { Icon, Table, IconButton } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

export default function Users({ users, onAddSessionToDoctor }) {
  const { t } = useTranslation();

  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={users} bordered={false}>
          <CRTable.CRColumn flexGrow={3}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="edit" onClick={() => onAddSessionToDoctor(data)}>
                    {' '}
                    {t('addSessionToDoctor')}
                  </Icon>
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

Users.propTypes = {};

Users.defaultProps = {
  users: [],
};
