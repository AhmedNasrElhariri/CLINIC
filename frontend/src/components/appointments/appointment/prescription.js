import React, { useRef } from 'react';
import { Modal, Button, Input, Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';

import PrescriptionPrint from './prescription-print';

const Prescription = ({
  visible,
  patient,
  onClose,
  content,
  onChange,
  clinicInfo,
}) => {
  const ref = useRef();

  return (
    <>
      <Modal show={visible} onHide={onClose}>
        <PrescriptionPrint
          ref={ref}
          content={content}
          clinicInfo={clinicInfo}
          {...patient}
        />
        <Modal.Header>
          <Modal.Title>Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            componentClass="textarea"
            value={content}
            rows={38}
            onChange={onChange}
          />
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
