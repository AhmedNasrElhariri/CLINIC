import React, { useState, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import { Div, CRNav } from 'components';
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
      <Div display="flex">
        <Div width={300}>
          <CRNav vertical onSelect={setActiveLab}>
            {labDocs.map((lab, idx) => (
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
    </>
  );
}

ListLabDocs.defaultProps = {
  labDocs: [],
};

export default ListLabDocs;
