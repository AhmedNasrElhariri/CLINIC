import React, { useCallback } from 'react';
import { Icon } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { CRCard, CRTable } from 'components';

function ListCourses({
  courses,
  setCourse,
  setShowCourseData,
  currentPage,
  setCurrentPage,
  pages,
}) {
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  const { t } = useTranslation();
  return (
    <>
      <CRCard borderless>
        <CRTable
          autoHeight
          data={courses}
          onRowClick={course => {
            setCourse(course);
            setShowCourseData(true);
          }}
        >
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('courseName')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ courseDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {courseDefinition?.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('phoneNo')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled bold>
                  {patient.phoneNo}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('coursePrice')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>{t('courseUnpaid')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price, paid }) => (
                <CRTable.CRCellStyled bold>{price - paid}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
        <CRTable.CRPagination
          lengthMenu={[
            {
              value: 10,
              label: 10,
            },
            {
              value: 20,
              label: 20,
            },
          ]}
          activePage={currentPage?.activePage}
          pages={pages}
          onSelect={handleSelect}
          total={courses.length}
        />
      </CRCard>
    </>
  );
}

export default ListCourses;
