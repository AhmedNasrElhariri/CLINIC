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
        <CRNav onSelect={onSelect}>
          {navs.map(v => (
            <CRNav.CRItem
              eventKey={v.id}
              key={v.id}
              active={active === v.id}
              {...v}
            >
              {v.title}
            </CRNav.CRItem>
          ))}
        </CRNav>
      </Div>
    </>
  );
};

export default ReportNav;
