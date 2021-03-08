import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';
import { Div, CRNav, H6 } from 'components';
import ListLabImages from './list-lab-images';


function ListLabDocs({labs}) {
  // const [activeLab, setActiveLab] = useState('');

  // useEffect(() => {
  //   if (!activeLab && labDocs.length) {
  //     setActiveLab(labDocs[0]);
  //   }
  // }, [activeLab, labDocs]);

  // const images = useMemo(
  //   () => R.pipe(R.propOr([], 'documents'), R.map(R.prop('file')))(activeLab),
  //   [activeLab]
  // );

  return (
    // <>
    //   {labDocs.length ? (
    //     <Div display="flex">
    //       <Div width={300}>
    //         <CRNav vertical onSelect={setActiveLab}>
    //           {labDocs.map(lab => (
    //             <CRNav.CRVItem
    //               eventKey={lab}
    //               key={lab.id}
    //               active={activeLab.id === lab.id}
    //             >
    //               {lab.name}
    //             </CRNav.CRVItem>
    //           ))}
    //         </CRNav>
    //       </Div>
    //       <Div flexGrow={1} px={4} pb={6}>
    //         <ListLabImages images={images} />
    //       </Div>
    //     </Div>
    //   ) : (
    //     <>
    //       <Div
    //         display="flex"
    //         justifyContent="center"
    //         alignItems="center"
    //         height={300}
    //       >
    //         <H6 color="texts.2">No Labs</H6>
    //       </Div>
    //     </>
    //   )}
    // </>
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
