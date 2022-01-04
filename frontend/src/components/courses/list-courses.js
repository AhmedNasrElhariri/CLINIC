import React from 'react';
import { Icon } from 'rsuite';

import { CRCard, CRTable } from 'components';

function ListCourses({ courses,setCourse,setShowCourseData }) {
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
          {/* <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Patient Name</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ patient }) => (
                <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn> */}
          <CRTable.CRColumn flexGrow={1}>
            <CRTable.CRHeaderCell>Course Price</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ price }) => (
                <CRTable.CRCellStyled bold>{price}</CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        </CRTable>
      </CRCard>
    </>
  );
}

export default ListCourses;
