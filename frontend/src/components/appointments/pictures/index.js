import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FlexboxGrid } from 'rsuite';
import { Div, CRModal, CRButton, H3 } from 'components';
import CRUploader from './uploader';
import AppointmentGallery from './gallery';
import { useModal, useAppointments } from 'hooks';
import ImgBox from './img-box';
import * as R from 'ramda';

const AppointmentPictures = ({ formValue, onChange: setFormValue }) => {
  const { visible, open, close } = useModal();
  const [photoValue, setPhotoValue] = useState({ imageId: null });
  const [header, setHeader] = useState('');
  const [galleryVisibility] = useState(false);
  const ref = useRef();
  const { deleteAppointmentPhoto } = useAppointments({ onDeletePhoto: close });
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

  const handleDeleteImage = useCallback(
    data => {
      const image = R.pick(['id'])(data);
      setHeader('Delete Image');
      setPhotoValue({ imageId: image.id });
      open();
    },
    [open, setPhotoValue, setHeader, photoValue]
  );
  const handleAdd = useCallback(() => {
    if (header === 'Appointment pictures') {
      close();
    } else {
      deleteAppointmentPhoto({
        variables: {
          id: photoValue.imageId,
        },
      });
      const newFormValue = formValue.filter(
        ({ id }) => id !== photoValue.imageId
      );
      setFormValue(newFormValue);
    }
  }, [
    close,
    header,
    deleteAppointmentPhoto,
    photoValue,
    setFormValue,
    formValue,
  ]);
 
  return (
    <Div>
      <Div textAlign="right">
        <CRButton
          variant="primary"
          onClick={() => {
            open();
            setHeader('Appointment pictures');
          }}
        >
          Add / Edit
        </CRButton>
      </Div>
      <AppointmentGallery pictures={pictures} onDelete={handleDeleteImage} />
      <CRModal
        header={header}
        onCancel={close}
        onHide={close}
        show={visible}
        onOk={handleAdd}
        width={1300}
        bodyStyle={{ paddingLeft: 20, paddingRight: 20, margin: 0 }}
      >
        {header === 'Appointment pictures' ? (
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
        ) : (
          <Div>
            <H3>Are you sure that you want to delete the Image ? </H3>
          </Div>
        )}
      </CRModal>
    </Div>
  );
};

export default AppointmentPictures;
