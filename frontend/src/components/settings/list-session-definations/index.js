import React from 'react';
import PropTypes from 'prop-types';

import { CRTable } from 'components';
import { DeleteOLIcon } from 'components/icons';

const ListSessionDefinations = ({ sessions, onDelete }) => {
  return (
    <CRTable autoHeight data={sessions} cellBordered>
      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="name" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn flexGrow={1}>
        <CRTable.CRHeaderCell>Price</CRTable.CRHeaderCell>
        <CRTable.CRCell dataKey="price" semiBold />
      </CRTable.CRColumn>

      <CRTable.CRColumn width={130}>
        <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
        <CRTable.CRCell>
          {(_, index) => (
            <CRTable.CRCellStyled>
              <DeleteOLIcon onClick={() => onDelete(index)} />
            </CRTable.CRCellStyled>
          )}
        </CRTable.CRCell>
      </CRTable.CRColumn>
    </CRTable>
  );
};

ListSessionDefinations.propTypes = {
  sessions: PropTypes.array,
};

ListSessionDefinations.defaultProps = {
  sessions: [],
};

export default ListSessionDefinations;
