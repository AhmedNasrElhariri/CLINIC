import React from 'react';
import { Tag, Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { useTranslation } from 'react-i18next';

export default function Users({ users, onEdit }) {
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={users} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name" bold />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('email')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="email" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('position')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="position" />
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('specialty')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ specialty }) => (
                <div>
                  {specialty.map(({ name }, index) => (
                    <Tag key={index}>{name}</Tag>
                  ))}
                </div>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="edit" onClick={() => onEdit(data)}>
                    {' '}
                    {t('edit')}
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
