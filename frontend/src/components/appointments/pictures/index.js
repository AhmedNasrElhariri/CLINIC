import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FlexboxGrid } from 'rsuite';
import axios from 'axios';
import { Div, CRModal, CRButton } from 'components';
import CRUploader from './uploader';
import AppointmentGallery from './gallery';
import { useModal } from 'hooks';
import ImgBox from './img-box';

const AppointmentPictures = ({ formValue, onChange: setFormValue }) => {
  const { visible, open, close } = useModal();
  const [galleryVisibility] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.fullScreen();
    }
  }, [galleryVisibility]);

  const handleFinishedUpload = useCallback(
    res => {
      setFormValue([...formValue, ...res]);
    },
    [formValue, setFormValue]
  );

  const handleCommentChange = useCallback(
    (comment, idx) => {
      const newVal = formValue.map((img, index) =>
        idx === index ? { ...img, comment } : img
      );
      setFormValue(newVal);
    },
    [formValue, setFormValue]
  );

  const handleDeleteImg = useCallback(
    (collectionId, imgIdx) => {
      const newFormValue = formValue.map((c, cIdx) =>
        cIdx === collectionId
          ? {
              ...c,
              pictures: c.pictures.filter((i, idx) => idx !== imgIdx),
            }
          : c
      );
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const pictures = useMemo(
    () => formValue.map(f => ({ ...f, original: f.url })),
    [formValue]
  );

  return (
    <Div>
      <Div textAlign="right">
        <CRButton variant="primary" onClick={open}>
          Add / Edit
        </CRButton>
      </Div>
      <AppointmentGallery pictures={pictures} />
      <CRModal
        header="Appointment pictures"
        onCancel={close}
        onHide={close}
        show={visible}
        onOk={close}
        width={1300}
        bodyStyle={{ paddingLeft: 20, paddingRight: 20, margin: 0 }}
      >
        <FlexboxGrid>
          {formValue.map((img, idx) => (
            <FlexboxGrid.Item colspan={6} md={6} key={idx}>
              <Div mr={(idx + 1) % 4 === 0 ? 0 : 2} mb={3}>
                <ImgBox
                  {...img}
                  onCommentChange={value => handleCommentChange(value, idx)}
                />
              </Div>
            </FlexboxGrid.Item>
          ))}
          <FlexboxGrid.Item colspan={6} md={6}>
            <CRUploader onUpload={handleFinishedUpload} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </CRModal>
    </Div>
  );
};

export default AppointmentPictures;
