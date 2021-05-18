import React from 'react';
import { CRCard, CRTable } from 'components';
import styled from 'styled-components';
import { formatDate } from 'utils/date';
const StyledImage = styled.img`
  width: 100%;
`;
const Row = styled.div`
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  padding: 0 4px;
`;
const Column = styled.div`
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
  @media screen and (max-width: 800px) {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
  @media screen and (max-width: 600px) {
    -ms-flex: 100%;
    flex: 100%;
    max-width: 100%;
  }
`;
function ListLabDocs({ labs, labId }) {
  const lab = labs.filter(ele => ele.id === labId);
  const documents = lab[0]?.documents;
  console.log(documents);
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={lab}>
          <CRTable.CRColumn flexGrow={0.5}>
            <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled semiBold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Value</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="value" semiBold />
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
      <Row>
        <Column>
          {documents?.map(im => (
            <StyledImage alt="Image" src={im.url} />
          ))}
        </Column>
      </Row>
    </>
  );
}
ListLabDocs.defaultProps = {
  labDocs: [],
};
export default ListLabDocs;
