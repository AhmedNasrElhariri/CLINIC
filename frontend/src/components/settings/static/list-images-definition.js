import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListImagesDefinition({ images, onEdit }) {
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={images}
          rowHeight={35}
          minHeight={35}
          height="35px"
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Image Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="imageName" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Category Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="category" semiBold />
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <Icon
                  icon="edit"
                  onClick={() => onEdit(data)}
                  style={{
                    fontSize: 17,
                    padding: 5,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(224, 224, 222)',
                  }}
                >
                  {' '}
                  Edit
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <Icon
                  icon="trash"
                  onClick={() => onEdit(data)}
                  style={{
                    fontSize: 17,
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgb(224, 224, 222)',
                  }}
                >
                  {' '}
                  Delete
                </Icon>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListImagesDefinition;
