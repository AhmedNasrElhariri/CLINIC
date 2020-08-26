import React from 'react';

import { Div, CRNav } from 'components';

const navs = [
  { id: 0, title: 'Accounting' },
  { id: 1, title: 'Reports' },
];

const ReportNav = ({ active, onSelect }) => {
  return (
    <>
      <Div width={200}>
        <CRNav vertical onSelect={onSelect}>
          {navs.map(v => (
            <CRNav.CRVItem
              eventKey={v.id}
              key={v.id}
              active={active === v.id}
              {...v}
            >
              {v.title}
            </CRNav.CRVItem>
          ))}
        </CRNav>
      </Div>
    </>
  );
};

export default ReportNav;
