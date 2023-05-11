import { CRTable, Div } from 'components';
import EditItem from '../edit-item';
import RemoveItemDefinition from '../remove-item-definition';
import { approximatlyToTwoNumbers } from 'services/general';
const ListItemsDefinitions = ({ items, onRemove, t }) => {
  return (
    <CRTable autoHeight data={items}>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="name" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('unitOfMeasure')}</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="unitOfMeasure" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('numberOfUnits')}</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="quantity" semiBold />
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('sellingPricePerUnit')}</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="sellingPricePerUnit" semiBold />
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('sellingPricePerBox')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ sellingPricePerBox }) => (
            <CRTable.CRCellStyled>
              {approximatlyToTwoNumbers(sellingPricePerBox)}
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('alertNumberOfBoxes')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ alertNumberOfBoxes }) => (
            <CRTable.CRCellStyled>{alertNumberOfBoxes}</CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>{t('sellable')}</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {({ sellable }) => (
            <CRTable.CRCellStyled>
              {sellable ? 'Yes' : 'No'}
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>

      <CRTable.CRColumn width={60}>
        <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {data => (
            <Div
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
            >
              <EditItem defaultValue={data} t={t} />
              <RemoveItemDefinition item={data} />
            </Div>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
    </CRTable>
  );
};

ListItemsDefinitions.defaultProps = {
  items: [],
};

export default ListItemsDefinitions;
