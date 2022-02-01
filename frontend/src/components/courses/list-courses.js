import React, { useCallback } from 'react';
import { Icon } from 'rsuite';

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
            <CRTable.CRHeaderCell>Course Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ courseDefinition }) => (
                <CRTable.CRCellStyled bold>
                  {courseDefinition?.name}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Patient Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Patient Phone</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled bold>
                  {patient.phoneNo}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Course Price</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Course Unpaid</CRTable.CRHeaderCell>
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
