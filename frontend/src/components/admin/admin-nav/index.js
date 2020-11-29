import React from 'react';

import { Div, CRNav } from 'components';

const navs = [
  { id: 0, title: 'Branches' },
  { id: 1, title: 'Specializations' },
  { id: 2, title: 'Users' },
];

const AdminNav = ({ active, onSelect }) => {
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

export default AdminNav;
