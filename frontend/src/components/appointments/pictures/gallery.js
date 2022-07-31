import React, { useState, useRef, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import { Div } from 'components';
import ListImagesThumbnails from './list-pictures-thumbnails';

const AppointmentGallery = ({ pictures, onDelete }) => {
  const [galleryVisibility, setGalleryVisibility] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.fullScreen();
    }
  }, [galleryVisibility]);
  return (
    <Div>
      <ListImagesThumbnails
        pictures={pictures}
        onClick={() => setGalleryVisibility(true)}
        onDelete={onDelete}
      />
      {galleryVisibility && (
        <ImageGallery
          items={pictures}
          ref={ref}
          useBrowserFullscreen={false}
          showPlayButton={false}
          showBullets={true}
          showThumbnails={false}
          renderItem={a => (
            <Div>
              <img className="image-gallery-image" src={a.url} alt="" />
              <span className="image-gallery-description">
                <h6>{a.comment}</h6>
              </span>
            </Div>
          )}
          onScreenChange={isFull => {
            if (!isFull) {
              setGalleryVisibility(false);
            }
          }}
        />
      )}
    </Div>
  );
};

AppointmentGallery.defaultProps = {
  pictures: [],
};

export default AppointmentGallery;
