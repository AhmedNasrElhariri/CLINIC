import React, { useState, useEffect, useCallback } from 'react';

import { Div } from 'components';

import CourseTable from './course-row';

const AppointmentCourses = ({ selectedCourses, onChange }) => {
//   const { coursesDefinition } = useCourseDefinition();

//   useEffect(() => {
//     const newFormValue = imagesDefinition.map(l => ({
//       ...l,
//       required: selectedImages.includes(l.id),
//     }));
//     setFormValue(newFormValue);
//   }, [imagesDefinition, selectedImages]);

//   const handleOnClick = useCallback(
//     ({ id, required }) => {
//       const newState = !required;
//       const selectedImageIds = formValue
//         .filter(lf => (lf.id === id ? newState : lf.required))
//         .map(lf => lf.id);

//       onChange(selectedImageIds);
//     },
//     [formValue, onChange]
//   );
  return (
    <Div>
      <CourseTable courses={selectedCourses} />
    </Div>
  );
};

export default AppointmentCourses;
