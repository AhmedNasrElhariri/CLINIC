import React from 'react';
import { CRCard, CRTable } from 'components';
export default function ListSpecialties({ specialties }) {
  const specialtiesResult = Object.values(
    specialties.reduce((c, { branch, specialties }) => {
      c[branch] = c[branch] || { branch, specialties: [] };
      c[branch].specialties = c[branch].specialties.concat(
        Array.isArray(specialties) ? specialties : [specialties]
      );
      return c;
    }, {})
  );

  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={specialtiesResult} bordered={false}>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Branch</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="branch">
              {({ branch }) => (
                <CRTable.CRCellStyled bold>{branch}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>

          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Specialties</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="specialties">
              {({ specialties }) => (
                <CRTable.CRCellStyled bold>
                  {specialties.join(', ')}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

ListSpecialties.propTypes = {};

ListSpecialties.defaultProps = {
  specialties: [],
};
