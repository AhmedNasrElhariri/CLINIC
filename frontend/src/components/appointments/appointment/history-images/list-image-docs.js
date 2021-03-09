import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { Div, CRNav, H6 } from 'components';
import ListLabImages from './list-lab-images';

function ListLabDocs({images}) {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={images}>
        <CRTable.CRColumn flexGrow={0.5}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="name" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="date" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="resultValue" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Results</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="results" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell  semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <Icon
                icon="edit"
                
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
      </CRTable>
    </CRCard>
  );
}
ListLabDocs.defaultProps = {
  labDocs: [],
};
export default ListLabDocs;
