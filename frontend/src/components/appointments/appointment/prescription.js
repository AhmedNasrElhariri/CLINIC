import React, { useRef, useState } from 'react';
import { Modal, Button, Input, Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';

import PrescriptionPrint from './prescription-print';

const Prescription = ({ visible, patient, onClose }) => {
  const ref = useRef();
  const [content, setContent] = useState('');

  return (
    <>
      <Modal show={visible} onHide={onClose}>
        <PrescriptionPrint ref={ref} content={content} {...patient} />
        <Modal.Header>
          <Modal.Title>Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input componentClass="textarea" rows={38} onChange={setContent} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} appearance="primary">
            Ok
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button appearance="link" data-trigger>
                Print <Icon icon="print" data-trigger />
              </Button>
            )}
            content={() => ref.current}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Prescription;
