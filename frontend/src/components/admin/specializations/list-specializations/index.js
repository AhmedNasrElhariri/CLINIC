import React from 'react';
import { CRCard, CRTable } from 'components';
import { CheckboxGroup, Checkbox } from 'rsuite';

export default function ListSpecializations({ specializations }) {
  const specializationsResult = Object.values(
    specializations.reduce((c, { branch, specializations }) => {
      c[branch] = c[branch] || { branch, specializations: [] };
      c[branch].specializations = c[branch].specializations.concat(
        Array.isArray(specializations) ? specializations : [specializations]
      );
      return c;
    }, {})
  );

  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={specializationsResult} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Branch</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="branch">
              {({ branch }) => (
                <CRTable.CRCellStyled bold>{branch}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Specializations</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="specializations">
              {({ specializations }) => (
                <CRTable.CRCellStyled bold>
                  {specializations.join(', ')}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListSpecializations.propTypes = {};

ListSpecializations.defaultProps = {
  specializations: [],
};
