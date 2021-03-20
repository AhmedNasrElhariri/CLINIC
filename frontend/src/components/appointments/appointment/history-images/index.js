import React, { useState, useMemo, useEffect } from 'react';
import ListImageDocs from './list-image-docs';
import * as R from 'ramda';
import { SelectPicker } from 'rsuite';
import { GET_PATIENT_IMAGES_HISTORY } from 'apollo-client/queries';
import { useQuery } from '@apollo/client';
import { formatDate } from 'utils/date';

const HistoryImages = ({ patient }) => {
  const [formValue, setFormValue] = useState([]);
  const [image, setImage] = useState({});
  useEffect(() => {
    if (Object.keys(image).length !== 0) {
      setFormValue([...formValue, image]);
    }
  }, [formValue, image]);
  const status = 'completed';
  const patientId = patient.id;
  const { data } = useQuery(GET_PATIENT_IMAGES_HISTORY, {
    variables: { status: status, patientId: patientId },
  });
  const patientImageDocs = useMemo(
    () => R.propOr([], 'patientImageDocs')(data),
    [data]
  );
  const ImageDocs = patientImageDocs.map(element => {
    return {
      label: element.imageDefinition.name,
      value: {
        name: element.imageDefinition.name,
        value: element.value,
        date: formatDate(element.resultDate),
        results: 'view Images',
      },
      category: element.imageDefinition.name,
    };
  });
  return (
    <>
      <SelectPicker
        virtualized={false}
        name="image"
        onSelect={setImage}
        data={ImageDocs}
        block
        groupBy="category"
        style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
      />
      <ListImageDocs images={formValue} />
    </>
  );
};

HistoryImages.propTypes = {};

export default HistoryImages;
