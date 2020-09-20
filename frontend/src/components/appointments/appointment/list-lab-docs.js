import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import { Div, CRNav, H6 } from 'components';
import ListLabImages from './list-lab-images';

function ListLabDocs({ labDocs }) {
  const [activeLab, setActiveLab] = useState('');

  useEffect(() => {
    if (!activeLab && labDocs.length) {
      setActiveLab(labDocs[0]);
    }
  }, [activeLab, labDocs]);

  const images = useMemo(
    () => R.pipe(R.propOr([], 'documents'), R.map(R.prop('file')))(activeLab),
    [activeLab]
  );

  return (
    <>
      {labDocs.length ? (
        <Div display="flex">
          <Div width={300}>
            <CRNav vertical onSelect={setActiveLab}>
              {labDocs.map(lab => (
                <CRNav.CRVItem
                  eventKey={lab}
                  key={lab.id}
                  active={activeLab.id === lab.id}
                >
                  {lab.name}
                </CRNav.CRVItem>
              ))}
            </CRNav>
          </Div>
          <Div flexGrow={1} px={4} pb={6}>
            <ListLabImages images={images} />
          </Div>
        </Div>
      ) : (
        <>
          <Div
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={300}
          >
            <H6 color="texts.2">No Labs</H6>
          </Div>
        </>
      )}
    </>
  );
}

ListLabDocs.defaultProps = {
  labDocs: [],
};

export default ListLabDocs;
