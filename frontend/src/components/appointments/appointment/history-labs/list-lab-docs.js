import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Icon } from 'rsuite';
import { CRCard, CRTable } from 'components';
import { Div, CRNav, H6 } from 'components';
import ListLabImages from '../list-lab-images';

function ListLabDocs({ labs }) {
  return (
    <CRCard borderless>
      <CRTable autoHeight data={labs}>
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
          <CRTable.CRCell dataKey="value" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Results</CRTable.CRHeaderCell>
          <CRTable.CRCell dataKey="results" semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell semiBold />
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {data => (
              <Icon
                icon="edit"
                style={{
                  fontSize: 17,
                  padding: '14px 46px 21px 22px',
                  borderRadius: '0px',
                  backgroundColor: '#eef1f1',
                  marginLeft: '1px',
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
