import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { Divider } from 'rsuite';
import * as R from 'ramda';

import { Div, CRModal, CRButton } from 'components';
import Collection from './collection';
import useModal from 'hooks/use-model';
import CRUploader from './uploader';
import AppointmentGallery from './gallery';

const AppointmentImages = ({ formValue, onChange: setFormValue }) => {
  const { visible, open, close } = useModal();
  const [galleryVisibility] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.fullScreen();
    }
  }, [galleryVisibility]);

  const handleCreateCollection = useCallback(
    images => {
      const newFormValue = [...formValue, { caption: '', images }];
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const handleUpload = useCallback(
    (res, idx) => {
      const newFormValue = formValue.map((c, cIdx) =>
        idx === cIdx ? { ...c, images: [...c.images, ...res] } : c
      );
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const handleChangeCaption = useCallback(
    (caption, index) => {
      const newFormValue = formValue.map((c, idx) =>
        index === idx ? { ...c, caption } : c
      );
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const handleChangeComment = useCallback(
    (comment, collectionIdx, imgIdx) => {
      const newFormValue = formValue.map((c, cIdx) =>
        cIdx === collectionIdx
          ? {
              ...c,
              images: c.images.map((i, iIdx) =>
                iIdx === imgIdx ? { ...i, comment } : i
              ),
            }
          : c
      );
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const handleDeleteImg = useCallback(
    (collectionId, imgIdx) => {
      const newFormValue = formValue.map((c, cIdx) =>
        cIdx === collectionId
          ? {
              ...c,
              images: c.images.filter((i, idx) => idx !== imgIdx),
            }
          : c
      );
      setFormValue(newFormValue);
    },
    [formValue, setFormValue]
  );

  const images = useMemo(
    () =>
      R.pipe(
        R.map(c =>
          c.images.map(i => ({ ...i, caption: c.caption, original: i.url }))
        ),
        R.flatten
      )(formValue),
    [formValue]
  );

  return (
    <Div>
      <Div textAlign="right">
        <CRButton primary small onClick={open}>
          Add / Edit
        </CRButton>
      </Div>
      <AppointmentGallery images={images} />
      <CRModal
        header="Appointment Images"
        onCancel={close}
        onHide={close}
        show={visible}
        onOk={close}
        width={1300}
        bodyStyle={{ paddingLeft: 20, paddingRight: 20 }}
      >
        {formValue.map((c, idx) => (
          <Div key={idx}>
            {idx !== 0 && <Divider />}
            <Collection
              key={idx}
              {...c}
              onUpload={res => handleUpload(res, idx)}
              onChangeCaption={caption => handleChangeCaption(caption, idx)}
              onChangeComment={(comment, imgIdx) =>
                handleChangeComment(comment, idx, imgIdx)
              }
              onDelete={imgIdx => handleDeleteImg(idx, imgIdx)}
            />
          </Div>
        ))}
        <Divider />
        <CRUploader onUpload={handleCreateCollection} />
      </CRModal>
    </Div>
  );
};

export default AppointmentImages;
