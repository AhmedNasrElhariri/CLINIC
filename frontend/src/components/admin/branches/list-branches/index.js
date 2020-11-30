import React from 'react';
import { CRCard, CRTable } from 'components';

export default function ListBranches({ branches }) {
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={branches} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="name">
              {({ name }) => (
                <CRTable.CRCellStyled bold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="phone">
              {({ phone }) => (
                <CRTable.CRCellStyled bold>phone</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListBranches.propTypes = {};

ListBranches.defaultProps = {
  branches: [],
};
