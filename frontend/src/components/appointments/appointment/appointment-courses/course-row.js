import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListImagesDefinition({ courses }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={courses}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Course Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Course Status</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({  }) => (
                <CRTable.CRCellStyled bold>Draft</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn>
            <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {data => (
                <CRTable.CRCellStyled bold>
                  <Icon icon="edit" >
                    {' '}
                    Start
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

export default ListImagesDefinition;
