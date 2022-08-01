import React, { useMemo } from 'react';
import { CRCard, CRTable, CRButton, Div } from 'components';
import styled from 'styled-components';
import { formatDate } from 'utils/date';
import Axios from 'axios';
import FileDownload from 'js-file-download';
import AppointmentGallery from 'components/appointments/pictures/gallery';
import { useTranslation } from 'react-i18next';

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
const saveFile = url => {
  Axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  }).then(response => {
    FileDownload(response.data, 'report.pdf');
  });
};
function ListLabDocs({ labs, labId, onDelete }) {
  const { t } = useTranslation();
  const lab = labs.filter(ele => ele.id === labId);
  const documents = lab[0]?.documents;
  const pdfFiles = useMemo(() => {
    const files = documents?.filter(d => d.url.includes('.pdf' || '.txt'));
    return files;
  }, [documents]);
  const imagesFiles = useMemo(() => {
    const files = documents?.filter(
      d =>
        d.url.includes('.png') ||
        d.url.includes('.jpeg') ||
        d.url.includes('.jpg')
    );
    return files;
  }, [documents]);
 
  return (
    <>
      <CRCard borderless>
        <CRTable autoHeight data={lab}>
          <CRTable.CRColumn flexGrow={0.5}>
            <CRTable.CRHeaderCell>{t('name')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ name }) => (
                <CRTable.CRCellStyled semiBold>{name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('date')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date }) => (
                <CRTable.CRCellStyled>{formatDate(date)}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('value')}</CRTable.CRHeaderCell>
            <CRTable.CRCell dataKey="value" semiBold />
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>

      <Div mb={50}>
        <AppointmentGallery pictures={imagesFiles} onDelete={onDelete} />
      </Div>
      <Div mt={50}>
        {pdfFiles?.map(d => (
          <Div display="flex">
            <Div mr={10}>{'File'}</Div>
            <CRButton onClick={() => saveFile(d?.url)}>
              {t('downloadFile')}
            </CRButton>
          </Div>
        ))}
      </Div>
    </>
  );
}
ListLabDocs.defaultProps = {
  labDocs: [],
};
export default ListLabDocs;
