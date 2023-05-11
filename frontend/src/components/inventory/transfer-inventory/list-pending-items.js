import { CRCard, CRTable } from 'components';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
function ListPendingUserItems({ items, onGetAction, t }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={items}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ inventoryItem }) => (
                <CRTable.CRCellStyled bold>
                  {inventoryItem?.item?.name}
                  {'/'}
                  {inventoryItem?.branch?.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('numberOfUnits')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ numberOfUnits }) => (
                <CRTable.CRCellStyled bold>
                  {numberOfUnits}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('price')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <CheckCircleOutlined
                    className="!text-[18px] mr-10"
                    onClick={() => onGetAction(data, 'accept')}
                  />
                  <CloseCircleOutlined
                    className="!text-[18px]"
                    onClick={() => onGetAction(data, 'reject')}
                  />
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListPendingUserItems;
