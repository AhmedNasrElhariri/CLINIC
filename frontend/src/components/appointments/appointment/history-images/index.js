import React, { useState } from 'react';
import ListImageDocs from './list-image-docs';
import {Form} from 'rsuite';
import { usePatientImages } from 'hooks';
import { CRSelectInput } from 'components/widgets';
const initialValue = {
  imageId:'',
};
const HistoryImages = ({ patient }) => {
  const [formValue, setFormValue] = useState(initialValue);
  const { historyImages } = usePatientImages({
    patientId: patient.id,
  });
  const ImageDocs = historyImages.map(element => {
    return {
      name: element.imageDefinition.name,
      id: element.id,
    };
  });
  return (
    <>
      <Form formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          virtualized={false}
          name="imageId"
          data={ImageDocs}
          block
          style={{ marginTop: '10px', width: '310px', marginLeft: '0px' }}
        />
      </Form>
      <ListImageDocs imageId={formValue.imageId} images={historyImages}/>
    </>
  );
};

HistoryImages.propTypes = {};

export default HistoryImages;
